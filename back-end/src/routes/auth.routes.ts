import express from "express";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { loginSchema, signupSchema } from "../validators/auth.schema.ts";
import { nextId, users } from "../data/store.ts";
import { HttpError } from "../utils/http-error.ts";

const authRoutes = express.Router();

authRoutes.post(
    "/login",
    validate({ body: loginSchema }),
    asyncHandler(async (req, res) => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = users.find((u) => u.email === email);
        if (!user) {
            throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
        }

        req.session.user = {
            id: user.id,
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

        const exists = users.some((user) => user.email === email);
        if (exists) {
            throw new HttpError(409, "EMAIL_IN_USE", "Email already in use");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = {
            id: nextId("user"),
            email,
            passwordHash,
            firstName,
            lastName,
            role,
            createdAt: new Date().toISOString(),
        };

        users.push(user);
        sendData(
            res,
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            201,
        );
    }),
);

export default authRoutes;
