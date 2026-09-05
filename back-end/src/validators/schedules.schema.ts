import { z } from "zod";

export const scheduleSlotCreateSchema = z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    isAvailable: z.boolean(),
});

export const scheduleSlotUpdateSchema = scheduleSlotCreateSchema.partial();
