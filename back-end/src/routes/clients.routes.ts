import express from "express";
import { clients, resolveProfessionalByUserId } from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";

const clientsRoutes = express.Router();

clientsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const client = clients.find((item) => item.id === id);

        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client not found");
        }

        const isSelf = req.user?.id === client.userId;
        const isAdmin = req.user?.role === "admin";
        const isProfessional = req.user?.role === "professional";

        if (!isSelf && !isAdmin && !isProfessional) {
            throw new HttpError(403, "FORBIDDEN", "Cannot view this client");
        }

        sendData(res, client);
    }),
);

clientsRoutes.get(
    "/",
    asyncHandler(async (req, res) => {
        if (req.user?.role === "client") {
            const list = clients.filter((client) => client.userId === req.user?.id);
            sendData(res, list);
            return;
        }

        if (req.user?.role === "professional") {
            const professional = resolveProfessionalByUserId(req.user.id);
            sendData(res, { professional, clients });
            return;
        }

        sendData(res, clients);
    }),
);

export default clientsRoutes;
