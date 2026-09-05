import express from "express";
import { asyncHandler } from "../../../utils/async-handler.ts";
import Appointment from "../../../models/appointment.model.ts";
import {
    mapAppointmentEntity,
    mapPaymentEntity,
} from "../../../services/data-access.ts";
import Client from "../../../models/client.model.ts";
import Professional from "../../../models/professional.model.ts";
import Payment from "../../../models/payment.model.ts";
import { sendData } from "../../../utils/api-response.ts";

const adminHomeRouter = express.Router();

adminHomeRouter.get(
    "/card",
    asyncHandler(async (req, res) => {
        const appointments = (await Appointment.findAll()).map(
            mapAppointmentEntity,
        );
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
            completedAppointments: appointments.filter(
                (item) => item.status === "completed",
            ).length,
            pendingAppointments: appointments.filter(
                (item) => item.status === "pending",
            ).length,
            totalRevenue,
        });
    }),
);

adminHomeRouter.get(
    "/graph",
    asyncHandler(async (req, res) => {
        const appointmentCompleted = (
            await Appointment.findAll({
                where: { status: "completed" },
            })
        ).length;

        const appointmentPending = (
            await Appointment.findAll({
                where: { status: "pending" },
            })
        ).length;
        sendData(res, {
            appointmentCompleted,
            appointmentPending
        })
    }),
    
);

export default adminHomeRouter;
