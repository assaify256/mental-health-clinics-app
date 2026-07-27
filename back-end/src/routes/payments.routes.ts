import express from "express";
import {
    nextId,
    payments,
    resolveClientByUserId,
} from "../data/store.ts";
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

const paymentsRoutes = express.Router();

paymentsRoutes.get(
    "/export",
    validate({ query: paymentExportQuerySchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can export payments");
        }

        const query = req.query as { format: "csv" | "json"; from?: string; to?: string };
        let filtered = [...payments];

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
        const rows = filtered.map((payment) =>
            [
                payment.id,
                payment.clientId,
                payment.appointmentId ?? "",
                payment.amount,
                payment.status,
                payment.createdDate,
            ].join(","),
        );

        const csv = [header, ...rows].join("\n");
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

        let filtered = [...payments];

        if (req.user?.role === "client") {
            const client = resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            filtered = filtered.filter((payment) => payment.clientId === client.id);
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

        let clientId = body.clientId;
        if (req.user?.role === "client") {
            const client = resolveClientByUserId(req.user.id);
            if (!client) {
                throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
            }

            clientId = client.id;
        }

        if (!clientId) {
            throw new HttpError(400, "CLIENT_REQUIRED", "clientId is required");
        }

        const payment = {
            id: nextId("payment"),
            clientId,
            amount: body.amount,
            status: "pending" as const,
            createdDate: new Date().toISOString(),
            ...(body.appointmentId ? { appointmentId: body.appointmentId } : {}),
        };

        payments.push(payment);
        sendData(res, payment, 201);
    }),
);

paymentsRoutes.patch(
    "/:id/status",
    validate({ params: idParamSchema, body: paymentStatusSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only admin can update payment status");
        }

        const payment = payments.find((item) => item.id === req.params.id);
        if (!payment) {
            throw new HttpError(404, "PAYMENT_NOT_FOUND", "Payment not found");
        }

        payment.status = (req.body as { status: "pending" | "completed" | "failed" }).status;
        sendData(res, payment);
    }),
);

export default paymentsRoutes;
