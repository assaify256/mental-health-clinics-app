import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import Professional from "../models/professional.model.ts";
import User from "../models/user.model.ts";
import Profile from "../models/profile.model.ts";
import { mapProfessionalEntity } from "../services/data-access.ts";

const professionalsRoutes = express.Router();

professionalsRoutes.get(
    "/",
    asyncHandler(async (_req, res) => {
        const professionals = await Professional.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    required: false,
                    include: [{ model: Profile, as: "profile", required: false }],
                },
            ],
            order: [["id", "ASC"]],
        });

        const data = professionals.map((professional) => {
            const linkedUser = (professional as Professional & { user?: User & { profile?: Profile | null } })
                .user;
            return mapProfessionalEntity(professional, linkedUser?.profile ?? null);
        });

        sendData(res, data);
    }),
);

export default professionalsRoutes;
