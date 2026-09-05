import { z } from "zod";

export const recordCreateSchema = z.object({
    clientId: z.string().min(1),
    professionalId: z.string().optional(),
    recordType: z.string().min(1),
    content: z.string().min(1),
});

export const recordUpdateSchema = recordCreateSchema.partial();
