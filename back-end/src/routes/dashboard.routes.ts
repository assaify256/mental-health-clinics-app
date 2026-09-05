import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { requireRole } from "../middlewares/requireRole.ts";
import Appointment from "../models/appointment.model.ts";
import Client from "../models/client.model.ts";
import Payment from "../models/payment.model.ts";
import Professional from "../models/professional.model.ts";
import {
    mapAppointmentEntity,
    mapPaymentEntity,
    resolveClientByUserId,
    resolveProfessionalByUserId,
} from "../services/data-access.ts";

const dashboardRoutes = express.Router();

dashboardRoutes.get(
    "/admin/overview",
    requireRole("admin"),
    asyncHandler(async (_req, res) => {
        const appointments = (await Appointment.findAll()).map(mapAppointmentEntity);
        const clients = await Client.count();
        const professionals = await Professional.count();
        const payments = (await Payment.findAll()).map(mapPaymentEntity);

        const totalRevenue = payments
            .filter((payment) => payment.status === "completed")
            .reduce((sum, payment) => sum + payment.amount, 0);

        sendData(res, {
            totalAppointments: appointments.length,
            totalClients: clients,
            totalProfessionals: professionals,
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
        const appointments = (await Appointment.findAll()).map(mapAppointmentEntity);
        const payments = (await Payment.findAll()).map(mapPaymentEntity);

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
        const professional = await resolveProfessionalByUserId(req.user!.id);
        if (!professional) {
            sendData(res, {
                totalAppointments: 0,
                upcomingAppointments: 0,
                completedAppointments: 0,
                activeClients: 0,
            });
            return;
        }

        const appointments = (await Appointment.findAll()).map(mapAppointmentEntity);
        const mine = appointments.filter((item) => item.professionalId === String(professional.id));
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
        const client = await resolveClientByUserId(req.user!.id);
        if (!client) {
            sendData(res, {
                totalAppointments: 0,
                upcomingAppointments: 0,
                completedAppointments: 0,
                totalPayments: 0,
            });
            return;
        }

        const appointments = (await Appointment.findAll()).map(mapAppointmentEntity);
        const payments = (await Payment.findAll()).map(mapPaymentEntity);

        const mineAppointments = appointments.filter((item) => item.clientId === String(client.id));
        const minePayments = payments.filter((item) => item.clientId === String(client.id));
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
