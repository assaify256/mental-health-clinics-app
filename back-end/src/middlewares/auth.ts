import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error.ts";

export const authenticateSession = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    if (!req.session.user) {
        return next(
            new HttpError(401, "UNAUTHORIZED", "Authentication required"),
        );
    }

    req.user = req.session.user;
    return next();
};
