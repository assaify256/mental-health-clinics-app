import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { noteCreateSchema, noteUpdateSchema } from "../validators/notes.schema.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";
import Note from "../models/note.model.ts";
import {
    mapNoteEntity,
    parseIdParam,
    resolveClientByUserId,
} from "../services/data-access.ts";

const notesRoutes = express.Router();

notesRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };

        const rows = await Note.findAll({ order: [["id", "ASC"]] });
        let filtered = rows;
        if (req.user?.role === "client") {
            const client = await resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            filtered = filtered.filter((note) => note.clientId === client.id);
        }

        if (query.mine && req.user?.role === "admin") {
            filtered = [];
        }

        const paged = paginate(filtered.map(mapNoteEntity), query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

notesRoutes.post(
    "/",
    validate({ body: noteCreateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "client") {
            throw new HttpError(403, "FORBIDDEN", "Only clients can create personal notes");
        }

        const client = await resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const body = req.body as { title: string; content: string };
        const note = await Note.create({
            authorUserId: parseIdParam(req.user.id, "authorUserId"),
            clientId: client.id,
            title: body.title,
            content: body.content,
        });

        sendData(res, mapNoteEntity(note), 201);
    }),
);

notesRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: noteUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "client") {
            throw new HttpError(403, "FORBIDDEN", "Only clients can update notes");
        }

        const client = await resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const note = await Note.findByPk(parseIdParam(req.params.id));
        if (!note) {
            throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found");
        }

        if (note.clientId !== client.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot update this note");
        }

        const body = req.body as Partial<{ title: string; content: string }>;
        if (body.title) note.title = body.title;
        if (body.content) note.content = body.content;
        await note.save();

        sendData(res, mapNoteEntity(note));
    }),
);

notesRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "client") {
            throw new HttpError(403, "FORBIDDEN", "Only clients can delete notes");
        }

        const client = await resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const note = await Note.findByPk(parseIdParam(req.params.id));
        if (!note || note.clientId !== client.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot delete this note");
        }

        const payload = mapNoteEntity(note);
        await note.destroy();
        sendData(res, payload);
    }),
);

export default notesRoutes;
