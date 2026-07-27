import express from "express";
import { nextId, records } from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { recordCreateSchema, recordUpdateSchema } from "../validators/records.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";

const recordsRoutes = express.Router();

recordsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all records");
        }

        const query = req.query as unknown as { page: number; pageSize: number };
        const paged = paginate(records, query.page, query.pageSize);
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

        const record = {
            id: nextId("record"),
            clientId: body.clientId,
            recordType: body.recordType,
            content: body.content,
            createdDate: new Date().toISOString(),
            ...(body.professionalId ? { professionalId: body.professionalId } : {}),
        };

        records.push(record);
        sendData(res, record, 201);
    }),
);

recordsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const record = records.find((item) => item.id === req.params.id);
        if (!record) {
            throw new HttpError(404, "RECORD_NOT_FOUND", "Record not found");
        }

        sendData(res, record);
    }),
);

recordsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: recordUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update records");
        }

        const record = records.find((item) => item.id === req.params.id);
        if (!record) {
            throw new HttpError(404, "RECORD_NOT_FOUND", "Record not found");
        }

        Object.assign(record, req.body);
        sendData(res, record);
    }),
);

export default recordsRoutes;
