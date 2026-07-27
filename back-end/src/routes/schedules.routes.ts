import express from "express";
import {
    nextId,
    resolveProfessionalByUserId,
    schedules,
} from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { slotIdParamSchema } from "../validators/common.schema.ts";
import {
    scheduleSlotCreateSchema,
    scheduleSlotUpdateSchema,
} from "../validators/schedules.schema.ts";
import { HttpError } from "../utils/http-error.ts";

const schedulesRoutes = express.Router();

schedulesRoutes.get(
    "/me",
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can access own schedule");
        }

        const professional = resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const schedule = schedules.find((item) => item.professionalId === professional.id) ?? {
            professionalId: professional.id,
            slots: [],
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

        const professional = resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const payload = req.body as {
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        };

        let schedule = schedules.find((item) => item.professionalId === professional.id);
        if (!schedule) {
            schedule = { professionalId: professional.id, slots: [] };
            schedules.push(schedule);
        }

        const slot = {
            id: nextId("slot"),
            dayOfWeek: payload.dayOfWeek,
            startTime: payload.startTime,
            endTime: payload.endTime,
            isAvailable: payload.isAvailable,
        };

        schedule.slots.push(slot);
        sendData(res, slot, 201);
    }),
);

schedulesRoutes.patch(
    "/me/slots/:slotId",
    validate({ params: slotIdParamSchema, body: scheduleSlotUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can update schedule slots");
        }

        const professional = resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const schedule = schedules.find((item) => item.professionalId === professional.id);
        if (!schedule) {
            throw new HttpError(404, "SCHEDULE_NOT_FOUND", "Schedule not found");
        }

        const slot = schedule.slots.find((item) => item.id === req.params.slotId);
        if (!slot) {
            throw new HttpError(404, "SLOT_NOT_FOUND", "Schedule slot not found");
        }

        Object.assign(slot, req.body);
        sendData(res, slot);
    }),
);

schedulesRoutes.delete(
    "/me/slots/:slotId",
    validate({ params: slotIdParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional") {
            throw new HttpError(403, "FORBIDDEN", "Only professionals can delete schedule slots");
        }

        const professional = resolveProfessionalByUserId(req.user.id);
        if (!professional) {
            throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
        }

        const schedule = schedules.find((item) => item.professionalId === professional.id);
        if (!schedule) {
            throw new HttpError(404, "SCHEDULE_NOT_FOUND", "Schedule not found");
        }

        const index = schedule.slots.findIndex((item) => item.id === req.params.slotId);
        if (index < 0) {
            throw new HttpError(404, "SLOT_NOT_FOUND", "Schedule slot not found");
        }

        const [deleted] = schedule.slots.splice(index, 1);
        sendData(res, deleted);
    }),
);

export default schedulesRoutes;
