import express from "express";
import { users } from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { requireRole } from "../middlewares/requireRole.ts";
import { validate } from "../middlewares/validate.ts";
import { idParamSchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";

const usersRoutes = express.Router();

usersRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = users.find((item) => item.id === id);

        if (!user) {
            throw new HttpError(404, "USER_NOT_FOUND", "User not found");
        }

        if (req.user?.id !== id && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Cannot view this user");
        }

        const { passwordHash, ...safeUser } = user;
        sendData(res, safeUser);
    }),
);

usersRoutes.get(
    "/",
    requireRole("admin"),
    asyncHandler(async (_req, res) => {
        const list = users.map(({ passwordHash, ...safeUser }) => safeUser);
        sendData(res, list);
    }),
);

export default usersRoutes;
