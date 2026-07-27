import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().min(1),
});

export const slotIdParamSchema = z.object({
    slotId: z.string().min(1),
});

export const listQuerySchema = z.object({
    mine: z
        .union([z.literal("true"), z.literal("false")])
        .optional()
        .transform((value) => value === "true"),
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(20),
});
