import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import {
    paymentCreateSchema,
    paymentExportQuerySchema,
    paymentQuerySchema,
    paymentStatusSchema,
} from "../validators/payments.schema.ts";
import { idParamSchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";
import Payment from "../models/payment.model.ts";
import {
    mapPaymentEntity,
    parseIdParam,
    resolveClientByUserId,
} from "../services/data-access.ts";

const paymentsRoutes = express.Router();

paymentsRoutes.get(
    "/export",
    validate({ query: paymentExportQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can export payments");
        }

        const query = req.query as { format: "csv" | "json"; from?: string; to?: string };
        const rows = await Payment.findAll({ order: [["id", "ASC"]] });
        let filtered = rows.map(mapPaymentEntity);

        if (query.from) {
            const fromDate = new Date(query.from);
            filtered = filtered.filter((payment) => new Date(payment.createdDate) >= fromDate);
        }

        if (query.to) {
            const toDate = new Date(query.to);
            filtered = filtered.filter((payment) => new Date(payment.createdDate) <= toDate);
        }

        if (query.format === "json") {
            sendData(res, filtered);
            return;
        }

        const header = "id,clientId,appointmentId,amount,status,createdDate";
        const csvRows = filtered.map((payment) =>
            [
                payment.id,
                payment.clientId,
                payment.appointmentId ?? "",
                payment.amount,
                payment.status,
                payment.createdDate,
            ].join(","),
        );

        const csv = [header, ...csvRows].join("\n");
        res.setHeader("Content-Type", "text/csv");
        res.status(200).send(csv);
    }),
);

paymentsRoutes.get(
    "/",
    validate({ query: paymentQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as unknown as {
            mine?: boolean;
            status?: "pending" | "completed" | "failed";
            from?: string;
            to?: string;
            page: number;
            pageSize: number;
        };

        const rows = await Payment.findAll({ order: [["id", "ASC"]] });
        let filtered = rows.map(mapPaymentEntity);

        if (req.user?.role === "client") {
            const client = await resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            filtered = filtered.filter((payment) => payment.clientId === String(client.id));
        }

        if (query.mine && req.user?.role !== "admin") {
            // already reduced via role-based filter for client/professional
        }

        if (query.status) {
            filtered = filtered.filter((payment) => payment.status === query.status);
        }

        if (query.from) {
            const fromDate = new Date(query.from);
            filtered = filtered.filter((payment) => new Date(payment.createdDate) >= fromDate);
        }

        if (query.to) {
            const toDate = new Date(query.to);
            filtered = filtered.filter((payment) => new Date(payment.createdDate) <= toDate);
        }

        const paged = paginate(filtered, query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

paymentsRoutes.post(
    "/",
    validate({ body: paymentCreateSchema }),
    asyncHandler(async (req, res) => {
        const body = req.body as {
            appointmentId?: string;
            clientId?: string;
            amount: number;
            methodId?: string;
        };

        let clientId: number | undefined;
        if (req.user?.role === "client") {
            const client = await resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            clientId = client.id;
        } else if (body.clientId) {
            clientId = parseIdParam(body.clientId, "clientId");
        }

        if (!clientId) {
            throw new HttpError(400, "CLIENT_REQUIRED", "clientId is required");
        }

        const payment = await Payment.create({
            clientId,
            amount: body.amount,
            status: "pending",
            appointmentId: body.appointmentId
                ? parseIdParam(body.appointmentId, "appointmentId")
                : null,
            method: body.methodId ?? null,
            currency: "IDR",
        });

        sendData(res, mapPaymentEntity(payment), 201);
    }),
);

paymentsRoutes.patch(
    "/:id/status",
    validate({ params: idParamSchema, body: paymentStatusSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can update payment status");
        }

        const payment = await Payment.findByPk(parseIdParam(req.params.id));
        if (!payment) {
            throw new HttpError(404, "PAYMENT_NOT_FOUND", "Payment not found");
        }

        payment.status = (req.body as { status: "pending" | "completed" | "failed" }).status;
        if (payment.status === "completed" && !payment.paidAt) {
            payment.paidAt = new Date();
        }

        await payment.save();
        sendData(res, mapPaymentEntity(payment));
    }),
);

export default paymentsRoutes;
