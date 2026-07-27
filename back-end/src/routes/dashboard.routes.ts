import express from "express";
import {
    appointments,
    clients,
    payments,
    professionals,
    resolveClientByUserId,
    resolveProfessionalByUserId,
} from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { requireRole } from "../middlewares/requireRole.ts";

const dashboardRoutes = express.Router();

dashboardRoutes.get(
    "/admin/overview",
    requireRole("admin"),
    asyncHandler(async (_req, res) => {
        const totalRevenue = payments
            .filter((payment) => payment.status === "completed")
            .reduce((sum, payment) => sum + payment.amount, 0);

        sendData(res, {
            totalAppointments: appointments.length,
            totalClients: clients.length,
            totalProfessionals: professionals.length,
            completedAppointments: appointments.filter((item) => item.status === "completed")
                .length,
            pendingAppointments: appointments.filter((item) => item.status === "pending").length,
            totalRevenue,
        });
    }),
);

dashboardRoutes.get(
    "/admin/stats",
    requireRole("admin"),
    asyncHandler(async (req, res) => {
        const range = (req.query.range as string | undefined) ?? "month";

        sendData(res, {
            range,
            appointmentsByStatus: {
                pending: appointments.filter((item) => item.status === "pending").length,
                confirmed: appointments.filter((item) => item.status === "confirmed").length,
                completed: appointments.filter((item) => item.status === "completed").length,
                cancelled: appointments.filter((item) => item.status === "cancelled").length,
            },
            paymentsByStatus: {
                pending: payments.filter((item) => item.status === "pending").length,
                completed: payments.filter((item) => item.status === "completed").length,
                failed: payments.filter((item) => item.status === "failed").length,
            },
        });
    }),
);

dashboardRoutes.get(
    "/professional/overview",
    requireRole("professional"),
    asyncHandler(async (req, res) => {
        const professional = resolveProfessionalByUserId(req.user!.id);
        if (!professional) {
            sendData(res, {
                totalAppointments: 0,
                upcomingAppointments: 0,
                completedAppointments: 0,
                activeClients: 0,
            });
            return;
        }

        const mine = appointments.filter((item) => item.professionalId === professional.id);
        const now = new Date();

        sendData(res, {
            totalAppointments: mine.length,
            upcomingAppointments: mine.filter((item) => new Date(item.scheduledDate) >= now).length,
            completedAppointments: mine.filter((item) => item.status === "completed").length,
            activeClients: new Set(mine.map((item) => item.clientId)).size,
        });
    }),
);

dashboardRoutes.get(
    "/client/overview",
    requireRole("client"),
    asyncHandler(async (req, res) => {
        const client = resolveClientByUserId(req.user!.id);
        if (!client) {
            sendData(res, {
                totalAppointments: 0,
                upcomingAppointments: 0,
                completedAppointments: 0,
                totalPayments: 0,
            });
            return;
        }

        const mineAppointments = appointments.filter((item) => item.clientId === client.id);
        const minePayments = payments.filter((item) => item.clientId === client.id);
        const now = new Date();

        sendData(res, {
            totalAppointments: mineAppointments.length,
            upcomingAppointments: mineAppointments.filter((item) => new Date(item.scheduledDate) >= now)
                .length,
            completedAppointments: mineAppointments.filter((item) => item.status === "completed")
                .length,
            totalPayments: minePayments.reduce((sum, payment) => sum + payment.amount, 0),
        });
    }),
);

export default dashboardRoutes;
