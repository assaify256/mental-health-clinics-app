import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import Client from "../models/client.model.ts";
import { mapClientEntity, parseIdParam, resolveProfessionalByUserId } from "../services/data-access.ts";

const clientsRoutes = express.Router();

clientsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const id = parseIdParam(req.params.id);
        const client = await Client.findByPk(id);

        if (!client) {
            throw new HttpError(404, "CLIENT_NOT_FOUND", "Client not found");
        }

        const isSelf = req.user?.id === String(client.ownerUserId ?? "");
        const isAdmin = req.user?.role === "admin";
        const isProfessional = req.user?.role === "professional";

        if (!isSelf && !isAdmin && !isProfessional) {
            throw new HttpError(403, "FORBIDDEN", "Cannot view this client");
        }

        sendData(res, mapClientEntity(client));
    }),
);

clientsRoutes.get(
    "/",
    asyncHandler(async (req, res) => {
        const allClients = await Client.findAll({ order: [["id", "ASC"]] });

        if (req.user?.role === "client") {
            const list = allClients
                .filter((client) => String(client.ownerUserId ?? "") === req.user?.id)
                .map(mapClientEntity);
            sendData(res, list);
            return;
        }

        if (req.user?.role === "professional") {
            const professional = await resolveProfessionalByUserId(req.user.id);
            sendData(res, {
                professional: professional
                    ? {
                          id: String(professional.id),
                          userId: String(professional.userId),
                      }
                    : null,
                clients: allClients.map(mapClientEntity),
            });
            return;
        }

        sendData(res, allClients.map(mapClientEntity));
    }),
);

export default clientsRoutes;
