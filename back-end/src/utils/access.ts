import type { Request } from "express";
import { resolveClientByUserId, resolveProfessionalByUserId } from "../data/store.ts";
import { HttpError } from "./http-error.ts";

export const requireUser = (req: Request) => {
    if (!req.user) {
        throw new HttpError(401, "UNAUTHORIZED", "Authentication required");
    }

    return req.user;
};

export const requireClientProfile = (req: Request) => {
    const user = requireUser(req);
    const client = resolveClientByUserId(user.id);

    if (!client) {
        throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
    }

    return client;
};

export const requireProfessionalProfile = (req: Request) => {
    const user = requireUser(req);
    const professional = resolveProfessionalByUserId(user.id);

    if (!professional) {
        throw new HttpError(
            404,
            "PROFESSIONAL_NOT_FOUND",
            "Professional profile not found",
        );
    }

    return professional;
};
