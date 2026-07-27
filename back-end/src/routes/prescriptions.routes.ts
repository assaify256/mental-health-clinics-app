import express from "express";
import {
    nextId,
    prescriptions,
    resolveProfessionalByUserId,
} from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import {
    prescriptionCreateSchema,
    prescriptionUpdateSchema,
} from "../validators/prescriptions.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";

const prescriptionsRoutes = express.Router();

prescriptionsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all prescriptions");
        }

        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };
        let filtered = [...prescriptions];

        if (req.user?.role === "professional" && query.mine) {
            const professional = resolveProfessionalByUserId(req.user.id);
            if (!professional) {
                throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
            }

            filtered = filtered.filter((item) => item.professionalId === professional.id);
        }

        const paged = paginate(filtered, query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

prescriptionsRoutes.post(
    "/",
    validate({ body: prescriptionCreateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can create prescriptions");
        }

        const professional =
            req.user.role === "professional"
                ? resolveProfessionalByUserId(req.user.id)
                : undefined;

        const body = req.body as {
            clientId: string;
            appointmentId?: string;
            medicineName: string;
            dosage: string;
            frequency: string;
            duration: string;
            notes?: string;
        };

        const prescription = {
            id: nextId("prescription"),
            professionalId: professional?.id ?? "admin-generated",
            clientId: body.clientId,
            medicineName: body.medicineName,
            dosage: body.dosage,
            frequency: body.frequency,
            duration: body.duration,
            issuedDate: new Date().toISOString(),
            ...(body.appointmentId ? { appointmentId: body.appointmentId } : {}),
            ...(body.notes ? { notes: body.notes } : {}),
        };

        prescriptions.push(prescription);
        sendData(res, prescription, 201);
    }),
);

prescriptionsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const item = prescriptions.find((record) => record.id === req.params.id);
        if (!item) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        sendData(res, item);
    }),
);

prescriptionsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: prescriptionUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update prescriptions");
        }

        const item = prescriptions.find((record) => record.id === req.params.id);
        if (!item) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        Object.assign(item, req.body);
        sendData(res, item);
    }),
);

prescriptionsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can delete prescriptions");
        }

        const index = prescriptions.findIndex((record) => record.id === req.params.id);
        if (index < 0) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        const [deleted] = prescriptions.splice(index, 1);
        sendData(res, deleted);
    }),
);

export default prescriptionsRoutes;
