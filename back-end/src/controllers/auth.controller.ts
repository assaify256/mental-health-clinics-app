import type { NextFunction, Request, Response } from "express";
import {
    checkEmail,
    compareHashedPassword,
    createUser,
    hashPassword,
} from "../services/auth.service.ts";

declare module "express-session" {
    interface SessionData {
        email: string | null;
    }
}

export const signUpController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isEmailAvailable = await checkEmail(email);

        if (!isEmailAvailable) {
            res.status(401).json({
                message:
                    "User already existed, please login with that account or create new one with different email",
            });
        }
        const hashedPassword = await hashPassword(password);
        const isUserCreated = await createUser(email, hashedPassword);
        if (isUserCreated) {
            res.status(201).json({ message: "User created" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isEmailAvailable = await checkEmail(email);
        if (isEmailAvailable) {
            res.status(401).json({ message: "User not found" });
        }
        const isPasswordMatch = await compareHashedPassword(email, password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        req.session.email = email;
        req.session.save((error) => {
            if (error) {
                console.error("Session save error:", error);
                return res.status(500).json({ error: "Session error" });
            }

            return res.status(200).json({ ok: true, email });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
