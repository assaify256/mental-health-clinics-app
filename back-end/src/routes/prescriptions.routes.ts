import express from "express";
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
import Prescription from "../models/prescription.model.ts";
import {
    mapPrescriptionEntity,
    parseIdParam,
    resolveProfessionalByUserId,
} from "../services/data-access.ts";

const prescriptionsRoutes = express.Router();

prescriptionsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all prescriptions");
        }

        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };
        const rows = await Prescription.findAll({ order: [["id", "ASC"]] });
        let filtered = rows;

        if (req.user?.role === "professional" && query.mine) {
            const professional = await resolveProfessionalByUserId(req.user.id);
            if (!professional) {
                throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
            }

            filtered = filtered.filter((item) => item.professionalId === professional.id);
        }

        const paged = paginate(filtered.map(mapPrescriptionEntity), query.page, query.pageSize);
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
                ? await resolveProfessionalByUserId(req.user.id)
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

        const prescription = await Prescription.create({
            professionalId: professional?.id ?? null,
            clientId: parseIdParam(body.clientId, "clientId"),
            medicineName: body.medicineName,
            dosage: body.dosage,
            frequency: body.frequency,
            duration: body.duration,
            appointmentId: body.appointmentId
                ? parseIdParam(body.appointmentId, "appointmentId")
                : null,
            notes: body.notes ?? null,
            status: "active",
        });

        sendData(res, mapPrescriptionEntity(prescription), 201);
    }),
);

prescriptionsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const item = await Prescription.findByPk(parseIdParam(req.params.id));
        if (!item) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        sendData(res, mapPrescriptionEntity(item));
    }),
);

prescriptionsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: prescriptionUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update prescriptions");
        }

        const item = await Prescription.findByPk(parseIdParam(req.params.id));
        if (!item) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        const body = req.body as Partial<{
            clientId: string;
            appointmentId: string;
            medicineName: string;
            dosage: string;
            frequency: string;
            duration: string;
            notes: string;
        }>;

        if (body.clientId) item.clientId = parseIdParam(body.clientId, "clientId");
        if (body.appointmentId) {
            item.appointmentId = parseIdParam(body.appointmentId, "appointmentId");
        }
        if (body.medicineName) item.medicineName = body.medicineName;
        if (body.dosage) item.dosage = body.dosage;
        if (body.frequency) item.frequency = body.frequency;
        if (body.duration) item.duration = body.duration;
        if (typeof body.notes === "string") item.notes = body.notes;

        await item.save();
        sendData(res, mapPrescriptionEntity(item));
    }),
);

prescriptionsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can delete prescriptions");
        }

        const item = await Prescription.findByPk(parseIdParam(req.params.id));
        if (!item) {
            throw new HttpError(404, "PRESCRIPTION_NOT_FOUND", "Prescription not found");
        }

        const payload = mapPrescriptionEntity(item);
        await item.destroy();
        sendData(res, payload);
    }),
);

export default prescriptionsRoutes;
