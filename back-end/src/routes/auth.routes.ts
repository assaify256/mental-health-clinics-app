import express from "express";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { loginSchema, signupSchema } from "../validators/auth.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import User from "../models/user.model.ts";
import Profile from "../models/profile.model.ts";
import Professional from "../models/professional.model.ts";
import Client from "../models/client.model.ts";
import {
    mapUserEntity,
    toIdString,
} from "../services/data-access.ts";

const authRoutes = express.Router();

authRoutes.post(
    "/login",
    validate({ body: loginSchema }),
    asyncHandler(async (req, res) => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
        }

        req.session.user = {
            id: toIdString(user.id),
            email: user.email,
            role: user.role,
        };

        sendData(res, { user: req.session.user });
    }),
);

authRoutes.post(
    "/refresh",
    asyncHandler(async (req, res) => {
        if (!req.session.user) {
            throw new HttpError(401, "UNAUTHORIZED", "Not logged in");
        }

        sendData(res, { user: req.session.user });
    }),
);

authRoutes.post(
    "/logout",
    asyncHandler(async (req, res) => {
        await new Promise<void>((resolve, reject) => {
            req.session.destroy((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });

        sendData(res, { message: "Logged out" });
    }),
);

authRoutes.get(
    "/me",
    asyncHandler(async (req, res) => {
        if (!req.session.user) {
            throw new HttpError(401, "UNAUTHORIZED", "Not logged in");
        }

        sendData(res, req.session.user);
    }),
);

authRoutes.post(
    "/signup",
    validate({ body: signupSchema }),
    asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName, role } = req.body as {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            role: "admin" | "professional" | "client";
        };

        const exists = await User.findOne({ where: { email } });
        if (exists) {
            throw new HttpError(409, "EMAIL_IN_USE", "Email already in use");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            passwordHash,
            role,
        });

        await Profile.create({
            userId: user.id,
            firstName,
            lastName,
        });

        if (role === "professional") {
            await Professional.create({
                userId: user.id,
            });
        }

        if (role === "client") {
            await Client.create({
                ownerUserId: user.id,
                firstName,
                lastName,
                relationshipToOwner: "self",
            });
        }

        const mapped = mapUserEntity(
            user,
            { firstName, lastName } as unknown as Profile,
        );
        sendData(
            res,
            {
                id: mapped.id,
                email: mapped.email,
                firstName: mapped.firstName,
                lastName: mapped.lastName,
                role: mapped.role,
            },
            201,
        );
    }),
);

export default authRoutes;
