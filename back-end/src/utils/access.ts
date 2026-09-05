import type { Request } from "express";
import {
    mapClientEntity,
    mapProfessionalEntity,
    resolveClientByUserId,
    resolveProfessionalByUserId,
} from "../services/data-access.ts";
import User from "../models/user.model.ts";
import Profile from "../models/profile.model.ts";
import { HttpError } from "./http-error.ts";

export const requireUser = (req: Request) => {
    if (!req.user) {
        throw new HttpError(401, "UNAUTHORIZED", "Authentication required");
    }

    return req.user;
};

export const requireClientProfile = async (req: Request) => {
    const user = requireUser(req);
    const client = await resolveClientByUserId(user.id);

    if (!client) {
        throw new HttpError(404, "CLIENT_NOT_FOUND", "Client profile not found");
    }

    return mapClientEntity(client);
};

export const requireProfessionalProfile = async (req: Request) => {
    const user = requireUser(req);
    const professional = await resolveProfessionalByUserId(user.id);

    if (!professional) {
        throw new HttpError(
            404,
            "PROFESSIONAL_NOT_FOUND",
            "Professional profile not found",
        );
    }

    const linkedUser = await User.findByPk(professional.userId, {
        include: [{ model: Profile, as: "profile", required: false }],
    });

    const profile = (linkedUser as User & { profile?: Profile | null } | null)?.profile;
    return mapProfessionalEntity(professional, profile ?? null);
};
