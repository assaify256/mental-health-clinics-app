import express from "express";
import {
    appointments,
    nextId,
    resolveClientByUserId,
    resolveProfessionalByUserId,
} from "../data/store.ts";
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

const appointmentsRoutes = express.Router();

appointmentsRoutes.get(
    "/calendar",
    validate({ query: appointmentQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as {
            month?: string;
        };

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

        let filtered = [...appointments];
        const now = new Date();

        if (user.role === "client") {
            const client = resolveClientByUserId(user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }
            filtered = filtered.filter((appointment) => appointment.clientId === client.id);
        }

        if (user.role === "professional") {
            const professional = resolveProfessionalByUserId(user.id);
            if (!professional) {
                throw new HttpError(
                    404,
                    "PROFESSIONAL_NOT_FOUND",
                    "Professional profile not found",
                );
            }

            if (query.mine || !query.professionalId) {
                filtered = filtered.filter(
                    (appointment) => appointment.professionalId === professional.id,
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

        let clientId = body.clientId;

        if (user.role === "client") {
            const client = resolveClientByUserId(user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            clientId = client.id;
        }

        if (!clientId) {
            throw new HttpError(400, "CLIENT_REQUIRED", "clientId is required");
        }

        const appointment = {
            id: nextId("appt"),
            clientId,
            professionalId: body.professionalId,
            scheduledDate: body.scheduledDate,
            scheduledTime: body.scheduledTime,
            status: "pending" as const,
            createdAt: new Date().toISOString(),
            ...(body.notes ? { notes: body.notes } : {}),
        };

        appointments.push(appointment);
        sendData(res, appointment, 201);
    }),
);

appointmentsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const appointment = appointments.find((item) => item.id === req.params.id);
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const user = req.user!;
        if (user.role === "client") {
            const client = resolveClientByUserId(user.id);
            if (!client || appointment.clientId !== client.id) {
                throw new HttpError(403, "FORBIDDEN", "Cannot access this appointment");
            }
        }

        if (user.role === "professional") {
            const professional = resolveProfessionalByUserId(user.id);
            if (!professional || appointment.professionalId !== professional.id) {
                throw new HttpError(403, "FORBIDDEN", "Cannot access this appointment");
            }
        }

        sendData(res, appointment);
    }),
);

appointmentsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: appointmentUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot update appointment details");
        }

        const appointment = appointments.find((item) => item.id === req.params.id);
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        Object.assign(appointment, req.body);
        sendData(res, appointment);
    }),
);

appointmentsRoutes.patch(
    "/:id/status",
    validate({ params: idParamSchema, body: appointmentStatusSchema }),
    asyncHandler(async (req, res) => {
        const appointment = appointments.find((item) => item.id === req.params.id);
        if (!appointment) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const user = req.user!;
        const status = (req.body as { status: "pending" | "confirmed" | "completed" | "cancelled" })
            .status;

        if (user.role === "client") {
            const client = resolveClientByUserId(user.id);
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
        sendData(res, appointment);
    }),
);

appointmentsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can delete appointments");
        }

        const index = appointments.findIndex((item) => item.id === req.params.id);
        if (index < 0) {
            throw new HttpError(404, "APPOINTMENT_NOT_FOUND", "Appointment not found");
        }

        const [deleted] = appointments.splice(index, 1);
        sendData(res, deleted);
    }),
);

export default appointmentsRoutes;
