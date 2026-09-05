import { z } from "zod";

export const noteCreateSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});

export const noteUpdateSchema = noteCreateSchema.partial();
