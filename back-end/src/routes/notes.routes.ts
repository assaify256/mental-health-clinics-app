import express from "express";
import { nextId, notes, resolveClientByUserId } from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { noteCreateSchema, noteUpdateSchema } from "../validators/notes.schema.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";

const notesRoutes = express.Router();

notesRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };

        let filtered = [...notes];
        if (req.user?.role === "client") {
            const client = resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            filtered = filtered.filter((note) => note.clientId === client.id);
        }

        if (query.mine && req.user?.role === "admin") {
            filtered = [];
        }

        const paged = paginate(filtered, query.page, query.pageSize);
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

        const client = resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const body = req.body as { title: string; content: string };
        const now = new Date().toISOString();
        const note = {
            id: nextId("note"),
            clientId: client.id,
            title: body.title,
            content: body.content,
            createdDate: now,
            updatedDate: now,
        };

        notes.push(note);
        sendData(res, note, 201);
    }),
);

notesRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: noteUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "client") {
            throw new HttpError(403, "FORBIDDEN", "Only clients can update notes");
        }

        const client = resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const note = notes.find((item) => item.id === req.params.id);
        if (!note) {
            throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found");
        }

        if (note.clientId !== client.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot update this note");
        }

        Object.assign(note, req.body, { updatedDate: new Date().toISOString() });
        sendData(res, note);
    }),
);

notesRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "client") {
            throw new HttpError(403, "FORBIDDEN", "Only clients can delete notes");
        }

        const client = resolveClientByUserId(req.user.id);
        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
        }

        const index = notes.findIndex((item) => item.id === req.params.id);
        if (index < 0) {
            throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found");
        }

        const note = notes[index];
        if (!note || note.clientId !== client.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot delete this note");
        }

        const [deleted] = notes.splice(index, 1);
        sendData(res, deleted);
    }),
);

export default notesRoutes;
