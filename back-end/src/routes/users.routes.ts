import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { requireRole } from "../middlewares/requireRole.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import User from "../models/user.model.ts";
import Profile from "../models/profile.model.ts";
import { mapUserEntity, parseIdParam, toIdString } from "../services/data-access.ts";

const usersRoutes = express.Router();

usersRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const id = parseIdParam(req.params.id);
        const user = await User.findByPk(id);

        if (!user) {
            throw new HttpError(404, "USER_NOT_FOUND", "User not found");
        }

        if (req.user?.id !== toIdString(id) && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Cannot view this user");
        }

        const profile = await Profile.findOne({ where: { userId: id } });
        sendData(res, mapUserEntity(user, profile));
    }),
);

usersRoutes.get(
    "/",
    requireRole("admin"),
    asyncHandler(async (_req, res) => {
        const users = await User.findAll({
            include: [{ model: Profile, as: "profile", required: false }],
            order: [["id", "ASC"]],
        });

        const list = users.map((user) =>
            mapUserEntity(user, (user as User & { profile?: Profile | null }).profile),
        );
        sendData(res, list);
    }),
);

export default usersRoutes;
