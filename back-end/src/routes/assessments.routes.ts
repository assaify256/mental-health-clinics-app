import express from "express";
import {
    assessments,
    nextId,
    resolveProfessionalByUserId,
} from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { assessmentCreateSchema, assessmentUpdateSchema } from "../validators/assessments.schema.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";

const assessmentsRoutes = express.Router();

assessmentsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };
        let filtered = [...assessments];

        if (req.user?.role === "professional" && query.mine) {
            const professional = resolveProfessionalByUserId(req.user.id);
            if (!professional) {
                throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
            }
            filtered = filtered.filter((item) => item.professionalId === professional.id);
        }

        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all assessments");
        }

        const paged = paginate(filtered, query.page, query.pageSize);
        sendPaginated(res, paged.data, paged.meta);
    }),
);

assessmentsRoutes.post(
    "/",
    validate({ body: assessmentCreateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can create assessments");
        }

        const professional =
            req.user.role === "professional"
                ? resolveProfessionalByUserId(req.user.id)
                : undefined;

        const body = req.body as {
            clientId: string;
            assessmentType: string;
            score?: number;
            notes?: string;
        };

        const assessment = {
            id: nextId("assessment"),
            professionalId: professional?.id ?? "admin-generated",
            clientId: body.clientId,
            assessmentType: body.assessmentType,
            createdDate: new Date().toISOString(),
            ...(typeof body.score === "number" ? { score: body.score } : {}),
            ...(body.notes ? { notes: body.notes } : {}),
        };

        assessments.push(assessment);
        sendData(res, assessment, 201);
    }),
);

assessmentsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const assessment = assessments.find((item) => item.id === req.params.id);
        if (!assessment) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        sendData(res, assessment);
    }),
);

assessmentsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: assessmentUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update assessments");
        }

        const assessment = assessments.find((item) => item.id === req.params.id);
        if (!assessment) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        Object.assign(assessment, req.body);
        sendData(res, assessment);
    }),
);

assessmentsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can delete assessments");
        }

        const index = assessments.findIndex((item) => item.id === req.params.id);
        if (index < 0) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        const [deleted] = assessments.splice(index, 1);
        sendData(res, deleted);
    }),
);

export default assessmentsRoutes;
