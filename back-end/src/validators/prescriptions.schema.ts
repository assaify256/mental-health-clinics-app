import { z } from "zod";

export const prescriptionCreateSchema = z.object({
    clientId: z.string().min(1),
    appointmentId: z.string().optional(),
    medicineName: z.string().min(1),
    dosage: z.string().min(1),
    frequency: z.string().min(1),
    duration: z.string().min(1),
    notes: z.string().optional(),
});

export const prescriptionUpdateSchema = prescriptionCreateSchema.partial();
