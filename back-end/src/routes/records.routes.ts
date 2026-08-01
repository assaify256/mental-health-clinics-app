import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { recordCreateSchema, recordUpdateSchema } from "../validators/records.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";
import MedicalRecord from "../models/medical-record.model.ts";
import { mapRecordEntity, parseIdParam } from "../services/data-access.ts";

const recordsRoutes = express.Router();

recordsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all records");
        }

        const query = req.query as unknown as { page: number; pageSize: number };
        const rows = await MedicalRecord.findAll({ order: [["id", "ASC"]] });
        const paged = paginate(rows.map(mapRecordEntity), query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

recordsRoutes.post(
    "/",
    validate({ body: recordCreateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can create records");
        }

        const body = req.body as {
            clientId: string;
            professionalId?: string;
            recordType: string;
            content: string;
        };

        const record = await MedicalRecord.create({
            clientId: parseIdParam(body.clientId, "clientId"),
            recordType: body.recordType,
            content: body.content,
            professionalId: body.professionalId
                ? parseIdParam(body.professionalId, "professionalId")
                : null,
        });

        sendData(res, mapRecordEntity(record), 201);
    }),
);

recordsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const record = await MedicalRecord.findByPk(parseIdParam(req.params.id));
        if (!record) {
            throw new HttpError(404, "RECORD_NOT_FOUND", "Record not found");
        }

        sendData(res, mapRecordEntity(record));
    }),
);

recordsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: recordUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update records");
        }

        const record = await MedicalRecord.findByPk(parseIdParam(req.params.id));
        if (!record) {
            throw new HttpError(404, "RECORD_NOT_FOUND", "Record not found");
        }

        const body = req.body as Partial<{
            clientId: string;
            professionalId: string;
            recordType: string;
            content: string;
        }>;

        if (body.clientId) record.clientId = parseIdParam(body.clientId, "clientId");
        if (body.professionalId) {
            record.professionalId = parseIdParam(body.professionalId, "professionalId");
        }
        if (body.recordType) record.recordType = body.recordType;
        if (body.content) record.content = body.content;

        await record.save();
        sendData(res, mapRecordEntity(record));
    }),
);

export default recordsRoutes;
