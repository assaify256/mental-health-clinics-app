import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { slotIdParamSchema } from "../validators/common.schema.ts";
import {
    scheduleSlotCreateSchema,
    scheduleSlotUpdateSchema,
} from "../validators/schedules.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import ScheduleSlot from "../models/schedule-slot.model.ts";
import {
    mapScheduleSlotEntity,
    parseIdParam,
    resolveProfessionalByUserId,
    toIdString,
} from "../services/data-access.ts";

const schedulesRoutes = express.Router();

schedulesRoutes.get(
    "/me",
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can access own schedule");
        }

        const professional = await resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const slots = await ScheduleSlot.findAll({
            where: { professionalId: professional.id },
            order: [["dayOfWeek", "ASC"], ["startTime", "ASC"]],
        });

        const schedule = {
            professionalId: toIdString(professional.id),
            slots: slots.map(mapScheduleSlotEntity),
        };

        sendData(res, schedule);
    }),
);

schedulesRoutes.post(
    "/me/slots",
    validate({ body: scheduleSlotCreateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can update schedule slots");
        }

        const professional = await resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const payload = req.body as {
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        };

        const slot = await ScheduleSlot.create({
            professionalId: professional.id,
            dayOfWeek: payload.dayOfWeek,
            startTime: payload.startTime,
            endTime: payload.endTime,
            isAvailable: payload.isAvailable,
        });

        sendData(res, mapScheduleSlotEntity(slot), 201);
    }),
);

schedulesRoutes.patch(
    "/me/slots/:slotId",
    validate({ params: slotIdParamSchema, body: scheduleSlotUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can update schedule slots");
        }

        const professional = await resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const slot = await ScheduleSlot.findByPk(parseIdParam(req.params.slotId, "slotId"));
        if (!slot) {
            throw new HttpError(404, "SLOT_NOT_FOUND", "Schedule slot not found");
        }

        if (slot.professionalId !== professional.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot update this schedule slot");
        }

        const body = req.body as Partial<{
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }>;

        if (typeof body.dayOfWeek === "number") slot.dayOfWeek = body.dayOfWeek;
        if (body.startTime) slot.startTime = body.startTime;
        if (body.endTime) slot.endTime = body.endTime;
        if (typeof body.isAvailable === "boolean") slot.isAvailable = body.isAvailable;

        await slot.save();
        sendData(res, mapScheduleSlotEntity(slot));
    }),
);

schedulesRoutes.delete(
    "/me/slots/:slotId",
    validate({ params: slotIdParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can delete schedule slots");
        }

        const professional = await resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const slot = await ScheduleSlot.findByPk(parseIdParam(req.params.slotId, "slotId"));
        if (!slot) {
            throw new HttpError(404, "SLOT_NOT_FOUND", "Schedule slot not found");
        }

        if (slot.professionalId !== professional.id) {
            throw new HttpError(403, "FORBIDDEN", "Cannot delete this schedule slot");
        }

        const payload = mapScheduleSlotEntity(slot);
        await slot.destroy();
        sendData(res, payload);
    }),
);

export default schedulesRoutes;
