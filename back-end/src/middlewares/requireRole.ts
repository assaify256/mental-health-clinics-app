import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/api.types.ts";
import { HttpError } from "../utils/http-error.ts";

export const requireRole = (...roles: UserRole[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new HttpError(401, "UNAUTHORIZED", "Authentication required"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new HttpError(403, "FORBIDDEN", "Insufficient permissions"));
        }

        return next();
    };
};
