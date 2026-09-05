import { z } from "zod";

export const assessmentCreateSchema = z.object({
    clientId: z.string().min(1),
    assessmentType: z.string().min(1),
    score: z.number().optional(),
    notes: z.string().optional(),
});

export const assessmentUpdateSchema = assessmentCreateSchema.partial();
