import { z } from "zod";

export const paymentQuerySchema = z.object({
    mine: z
        .union([z.literal("true"), z.literal("false")])
        .optional()
        .transform((value) => value === "true"),
    status: z.enum(["pending", "completed", "failed"]).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(20),
});

export const paymentCreateSchema = z.object({
    appointmentId: z.string().optional(),
    clientId: z.string().optional(),
    amount: z.coerce.number().positive(),
    methodId: z.string().optional(),
});

export const paymentStatusSchema = z.object({
    status: z.enum(["pending", "completed", "failed"]),
});

export const paymentExportQuerySchema = z.object({
    format: z.enum(["csv", "json"]).default("csv"),
    from: z.string().optional(),
    to: z.string().optional(),
});
