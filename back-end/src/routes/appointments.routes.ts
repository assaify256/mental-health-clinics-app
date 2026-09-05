import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import {
    appointmentCreateSchema,
    appointmentQuerySchema,
    appointmentStatusSchema,
    appointmentUpdateSchema,
    idParamSchema,
} from "../validators/appointments.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";
import Appointment from "../models/appointment.model.ts";
import {
    buildScheduledStart,
    getDateTimeParts,
    mapAppointmentEntity,
    parseIdParam,
    resolveClientByUserId,
    resolveProfessionalByUserId,
    toIdString,
} from "../services/data-access.ts";

const appointmentsRoutes = express.Router();

appointmentsRoutes.get(
    "/calendar",
    validate({ query: appointmentQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as {
            month?: string;
        };

        const rows = await Appointment.findAll({ order: [["id", "ASC"]] });
        const appointments = rows.map(mapAppointmentEntity);
        const month = query.month;
        const filtered = month
            ? appointments.filter((appointment) =>
                  appointment.scheduledDate.startsWith(month),
              )
            : appointments;

        const grouped = filtered.reduce<Record<string, typeof filtered>>(
            (acc, appointment) => {
                const date = appointment.scheduledDate.split("T")[0] ?? appointment.scheduledDate;
                acc[date] = acc[date] ?? [];
                acc[date].push(appointment);
                return acc;
            },
            {},
        );

        sendData(res, grouped);
    }),
);

appointmentsRoutes.get(
    "/",
    validate({ query: appointmentQuerySchema }),
    asyncHandler(async (req, res) => {
        const user = req.user!;
        const query = req.query as unknown as {
            mine?: boolean;
            timeframe?: "upcoming" | "past";
            status?: "pending" | "confirmed" | "completed" | "cancelled";
            from?: string;
            to?: string;
            professionalId?: string;
            clientId?: string;
            page: number;
            pageSize: number;
        };

        const rows = await Appointment.findAll({ order: [["id", "ASC"]] });
        const appointments = rows.map(mapAppointmentEntity);
        let filtered = [...appointments];
        const now = new Date();

        if (user.role === "client") {
            const client = await resolveClientByUserId(user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }
            filtered = filtered.filter((appointment) => appointment.clientId === toIdString(client.id));
        }

        if (user.role === "professional") {
            const professional = await resolveProfessionalByUserId(user.id);
            if (!professional) {
                throw new HttpError(
                    404,
                    "PROFESSIONAL_NOT_FOUND",
                    "Professional profile not found",
                );
            }

            if (query.mine || !query.professionalId) {
                filtered = filtered.filter(
                    (appointment) => appointment.professionalId === toIdString(professional.id),
                );
            }
        }

        if (query.status) {
            filtered = filtered.filter(
                (appointment) => appointment.status === query.status,
            );
        }

        if (query.professionalId && user.role !== "professional") {
            filtered = filtered.filter(
                (appointment) => appointment.professionalId === query.professionalId,
            );
        }

        if (query.clientId && user.role === "admin") {
            filtered = filtered.filter(
                (appointment) => appointment.clientId === query.clientId,
            );
        }

        if (query.from) {
            const fromDate = new Date(query.from);
            filtered = filtered.filter(
                (appointment) => new Date(appointment.scheduledDate) >= fromDate,
            );
        }

        if (query.to) {
            const toDate = new Date(query.to);
            filtered = filtered.filter(
                (appointment) => new Date(appointment.scheduledDate) <= toDate,
            );
        }

        if (query.timeframe === "upcoming") {
            filtered = filtered.filter(
                (appointment) => new Date(appointment.scheduledDate) >= now,
            );
        }

        if (query.timeframe === "past") {
            filtered = filtered.filter(
                (appointment) => new Date(appointment.scheduledDate) < now,
            );
        }

        const paged = paginate(filtered, query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

appointmentsRoutes.post(
    "/",
    validate({ body: appointmentCreateSchema }),
    asyncHandler(async (req, res) => {
        const user = req.user!;
        const body = req.body as {
            professionalId: string;
            clientId?: string;
            scheduledDate: string;
            scheduledTime: string;
            notes?: string;
        };

        let clientId: number | undefined;

        if (user.role === "client") {
            const client = await resolveClientByUserId(user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            // clientId = client.id;
        } else if (body.clientId) {
            clientId = parseIdParam(body.clientId, "clientId");
        }

        if (!clientId) {
            throw new HttpError(400, "CLIENT_REQUIRED", "clientId is required");
        }

        const appointment = await Appointment.create({
            clientId,
            professionalId: parseIdParam(body.professionalId, "professionalId"),
            scheduledStart: buildScheduledStart(body.scheduledDate, body.scheduledTime),
            status: "pending",
            notes: body.notes ?? null,
        })


        sendData(res, mapAppointmentEntity(appointment), 201);
        
    }),
);

appointmentsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const appointment = await Appointment.findByPk(parseIdParam(req.params.id));
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const user = req.user!;
        if (user.role === "client") {
            const client = await resolveClientByUserId(user.id);
            if (!client || appointment.clientId !== client.id) {
                throw new HttpError(403, "FORBIDDEN", "Cannot access this appointment");
            }
        }

        if (user.role === "professional") {
            const professional = await resolveProfessionalByUserId(user.id);
            if (!professional || appointment.professionalId !== professional.id) {
                throw new HttpError(403, "FORBIDDEN", "Cannot access this appointment");
            }
        }

        sendData(res, mapAppointmentEntity(appointment));
    }),
);

appointmentsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: appointmentUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot update appointment details");
        }

        const appointment = await Appointment.findByPk(parseIdParam(req.params.id));
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const body = req.body as Partial<{
            professionalId: string;
            clientId: string;
            scheduledDate: string;
            scheduledTime: string;
            notes: string;
            status: "pending" | "confirmed" | "completed" | "cancelled";
        }>;

        if (body.professionalId) {
            appointment.professionalId = parseIdParam(body.professionalId, "professionalId");
        }

        if (body.clientId) {
            appointment.clientId = parseIdParam(body.clientId, "clientId");
        }

        if (body.scheduledDate || body.scheduledTime) {
            const existing = getDateTimeParts(appointment.scheduledStart ?? appointment.createdAt);
            const nextDate = body.scheduledDate ?? existing.scheduledDate;
            const nextTime = body.scheduledTime ?? existing.scheduledTime;
            appointment.scheduledStart = buildScheduledStart(nextDate, nextTime);
        }

        if (typeof body.notes === "string") {
            appointment.notes = body.notes;
        }

        if (body.status) {
            appointment.status = body.status;
        }

        await appointment.save();
        sendData(res, mapAppointmentEntity(appointment));
    }),
);

appointmentsRoutes.patch(
    "/:id/status",
    validate({ params: idParamSchema, body: appointmentStatusSchema }),
    asyncHandler(async (req, res) => {
        const appointment = await Appointment.findByPk(parseIdParam(req.params.id));
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const user = req.user!;
        const status = (req.body as { status: "pending" | "confirmed" | "completed" | "cancelled" })
            .status;

        if (user.role === "client") {
            const client = await resolveClientByUserId(user.id);
            if (!client || appointment.clientId !== client.id) {
                throw new HttpError(403, "FORBIDDEN", "Cannot update this appointment");
            }

            if (status !== "cancelled") {
                throw new HttpError(
                    403,
                    "FORBIDDEN",
                    "Client can only set appointment status to cancelled",
                );
            }
        }

        appointment.status = status;
        await appointment.save();
        sendData(res, mapAppointmentEntity(appointment));
    }),
);

appointmentsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can delete appointments");
        }

        const appointment = await Appointment.findByPk(parseIdParam(req.params.id));
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const payload = mapAppointmentEntity(appointment);
        await appointment.destroy();
        sendData(res, payload);
    }),
);

export default appointmentsRoutes;
