import { z } from "zod";

export const appointmentQuerySchema = z.object({
    mine: z
        .union([z.literal("true"), z.literal("false")])
        .optional()
        .transform((value) => value === "true"),
    timeframe: z.enum(["upcoming", "past"]).optional(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    professionalId: z.string().optional(),
    clientId: z.string().optional(),
    month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(20),
});

export const appointmentCreateSchema = z.object({
    professionalId: z.string().min(1),
    clientId: z.string().min(1).optional(),
    scheduledDate: z.string().min(1),
    scheduledTime: z.string().regex(/^\d{2}:\d{2}$/),
    notes: z.string().optional(),
});

export const appointmentUpdateSchema = appointmentCreateSchema
    .partial()
    .extend({
        status: z
            .enum(["pending", "confirmed", "completed", "cancelled"])
            .optional(),
    });

export const appointmentStatusSchema = z.object({
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export const idParamSchema = z.object({
    id: z.string().min(1),
});
