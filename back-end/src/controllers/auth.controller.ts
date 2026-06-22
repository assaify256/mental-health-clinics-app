import type { NextFunction, Request, Response } from "express";
import {
    checkEmail,
    createUser,
    hashPassword,
} from "../services/sign-up.service.ts";

export const signUpController = async (req: Request, res: Response, next:NextFunction) => {
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
