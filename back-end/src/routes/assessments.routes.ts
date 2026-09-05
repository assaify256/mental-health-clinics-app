import express from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData, sendPaginated } from "../utils/api-response.ts";
import { validate } from "../middlewares/validate.ts";
import { assessmentCreateSchema, assessmentUpdateSchema } from "../validators/assessments.schema.ts";
import { idParamSchema, listQuerySchema } from "../validators/common.schema.ts";
import { HttpError } from "../utils/http-error.ts";
import { paginate } from "../utils/paginate.ts";
import Assessment from "../models/assessment.model.ts";
import {
    mapAssessmentEntity,
    parseIdParam,
    resolveProfessionalByUserId,
} from "../services/data-access.ts";

const assessmentsRoutes = express.Router();

assessmentsRoutes.get(
    "/",
    validate({ query: listQuerySchema }),
    asyncHandler(async (req, res) => {
        const query = req.query as unknown as { mine?: boolean; page: number; pageSize: number };
        const rows = await Assessment.findAll({ order: [["id", "ASC"]] });
        let filtered = rows;

        if (req.user?.role === "professional" && query.mine) {
            const professional = await resolveProfessionalByUserId(req.user.id);
            if (!professional) {
                throw new HttpError(404, "PROFESSIONAL_NOT_FOUND", "Professional profile not found");
            }
            filtered = filtered.filter((item) => item.professionalId === professional.id);
        }

        if (req.user?.role === "client") {
            throw new HttpError(403, "FORBIDDEN", "Clients cannot list all assessments");
        }

        const paged = paginate(filtered.map(mapAssessmentEntity), query.page, query.pageSize);
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
                ? await resolveProfessionalByUserId(req.user.id)
                : undefined;

        const body = req.body as {
            clientId: string;
            assessmentType: string;
            score?: number;
            notes?: string;
        };

        const assessment = await Assessment.create({
            professionalId: professional?.id ?? null,
            clientId: parseIdParam(body.clientId, "clientId"),
            assessmentType: body.assessmentType,
            score: typeof body.score === "number" ? body.score : null,
            notes: body.notes ?? null,
        });

        sendData(res, mapAssessmentEntity(assessment), 201);
    }),
);

assessmentsRoutes.get(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        const assessment = await Assessment.findByPk(parseIdParam(req.params.id));
        if (!assessment) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        sendData(res, mapAssessmentEntity(assessment));
    }),
);

assessmentsRoutes.patch(
    "/:id",
    validate({ params: idParamSchema, body: assessmentUpdateSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can update assessments");
        }

        const assessment = await Assessment.findByPk(parseIdParam(req.params.id));
        if (!assessment) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        const body = req.body as Partial<{
            clientId: string;
            assessmentType: string;
            score: number;
            notes: string;
        }>;

        if (body.clientId) {
            assessment.clientId = parseIdParam(body.clientId, "clientId");
        }
        if (body.assessmentType) {
            assessment.assessmentType = body.assessmentType;
        }
        if (typeof body.score === "number") {
            assessment.score = body.score;
        }
        if (typeof body.notes === "string") {
            assessment.notes = body.notes;
        }

        await assessment.save();
        sendData(res, mapAssessmentEntity(assessment));
    }),
);

assessmentsRoutes.delete(
    "/:id",
    validate({ params: idParamSchema }),
    asyncHandler(async (req, res) => {
        if (req.user?.role !== "professional" && req.user?.role !== "admin") {
            throw new HttpError(403, "FORBIDDEN", "Only professional/admin can delete assessments");
        }

        const assessment = await Assessment.findByPk(parseIdParam(req.params.id));
        if (!assessment) {
            throw new HttpError(404, "ASSESSMENT_NOT_FOUND", "Assessment not found");
        }

        const payload = mapAssessmentEntity(assessment);
        await assessment.destroy();
        sendData(res, payload);
    }),
);

export default assessmentsRoutes;
