import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error.ts";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
    next(new HttpError(404, "NOT_FOUND", `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Request validation failed",
                details: error.issues,
            },
        });
    }

    if (error instanceof HttpError) {
        return res.status(error.status).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details ?? [],
            },
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred",
            details: [],
        },
    });
};
