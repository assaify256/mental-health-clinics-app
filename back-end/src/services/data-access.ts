import { HttpError } from "../utils/http-error.ts";
import Appointment from "../models/appointment.model.ts";
import Assessment from "../models/assessment.model.ts";
import Client from "../models/client.model.ts";
import MedicalRecord from "../models/medical-record.model.ts";
import Note from "../models/note.model.ts";
import Payment from "../models/payment.model.ts";
import Prescription from "../models/prescription.model.ts";
import Professional from "../models/professional.model.ts";
import Profile from "../models/profile.model.ts";
import ScheduleSlot from "../models/schedule-slot.model.ts";
import User from "../models/user.model.ts";

const DEFAULT_ISO = new Date(0).toISOString();

export const toIdString = (value: number | string | null | undefined) =>
    value == null ? "" : String(value);

export const parseIdParam = (id: unknown, label = "id") => {
    const raw = Array.isArray(id) ? id[0] : id;
    if (typeof raw !== "string" && typeof raw !== "number") {
        throw new HttpError(400, "INVALID_ID", `Invalid ${label}`);
    }

    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new HttpError(400, "INVALID_ID", `Invalid ${label}`);
    }

    return parsed;
};

const twoDigits = (value: number) => String(value).padStart(2, "0");

export const getDateTimeParts = (value: Date | null | undefined) => {
    const date = value ?? new Date(DEFAULT_ISO);
    const yyyy = date.getUTCFullYear();
    const mm = twoDigits(date.getUTCMonth() + 1);
    const dd = twoDigits(date.getUTCDate());
    const hh = twoDigits(date.getUTCHours());
    const min = twoDigits(date.getUTCMinutes());

    return {
        scheduledDate: `${yyyy}-${mm}-${dd}T${hh}:${min}:00.000Z`,
        scheduledTime: `${hh}:${min}`,
    };
};

export const buildScheduledStart = (scheduledDate: string, scheduledTime: string) => {
    const normalizedDate = scheduledDate.includes("T")
        ? scheduledDate.split("T")[0]
        : scheduledDate;
    return new Date(`${normalizedDate}T${scheduledTime}:00.000Z`);
};

export const mapUserEntity = (
    user: User,
    profile?: Profile | null,
) => ({
    id: toIdString(user.id),
    email: user.email,
    role: user.role,
    firstName: profile?.firstName ?? "Unknown",
    lastName: profile?.lastName ?? "User",
    createdAt: user.createdAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapProfessionalEntity = (
    professional: Professional,
    profile?: Profile | null,
) => ({
    id: toIdString(professional.id),
    userId: toIdString(professional.userId),
    firstName: profile?.firstName ?? "Unknown",
    lastName: profile?.lastName ?? "Professional",
    specialty: professional.specialization ?? "General",
    licenseNumber: professional.licenseNumber ?? "",
    ...(professional.bio ? { bio: professional.bio } : {}),
});

export const mapClientEntity = (client: Client) => ({
    id: toIdString(client.id),
    userId: toIdString(client.ownerUserId),
    firstName: client.firstName ?? "Unknown",
    lastName: client.lastName ?? "Client",
});

export const mapAppointmentEntity = (appointment: Appointment) => {
    const { scheduledDate, scheduledTime } = getDateTimeParts(
        appointment.scheduledStart ?? appointment.createdAt,
    );

    return {
        id: toIdString(appointment.id),
        clientId: toIdString(appointment.clientId),
        professionalId: toIdString(appointment.professionalId),
        scheduledDate,
        scheduledTime,
        status: appointment.status,
        ...(appointment.notes ? { notes: appointment.notes } : {}),
        createdAt: appointment.createdAt?.toISOString() ?? DEFAULT_ISO,
    };
};

export const mapAssessmentEntity = (assessment: Assessment) => ({
    id: toIdString(assessment.id),
    professionalId: assessment.professionalId
        ? toIdString(assessment.professionalId)
        : "admin-generated",
    clientId: toIdString(assessment.clientId),
    assessmentType: assessment.assessmentType,
    ...(typeof assessment.score === "number" ? { score: assessment.score } : {}),
    ...(assessment.notes ? { notes: assessment.notes } : {}),
    createdDate: assessment.createdAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapPrescriptionEntity = (prescription: Prescription) => ({
    id: toIdString(prescription.id),
    professionalId: prescription.professionalId
        ? toIdString(prescription.professionalId)
        : "admin-generated",
    clientId: toIdString(prescription.clientId),
    ...(prescription.appointmentId
        ? { appointmentId: toIdString(prescription.appointmentId) }
        : {}),
    medicineName: prescription.medicineName,
    dosage: prescription.dosage,
    frequency: prescription.frequency,
    duration: prescription.duration,
    ...(prescription.notes ? { notes: prescription.notes } : {}),
    issuedDate: prescription.createdAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapRecordEntity = (record: MedicalRecord) => ({
    id: toIdString(record.id),
    clientId: toIdString(record.clientId),
    ...(record.professionalId ? { professionalId: toIdString(record.professionalId) } : {}),
    recordType: record.recordType,
    content: record.content,
    createdDate: record.createdAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapNoteEntity = (note: Note) => ({
    id: toIdString(note.id),
    clientId: toIdString(note.clientId),
    title: note.title,
    content: note.content,
    createdDate: note.createdAt?.toISOString() ?? DEFAULT_ISO,
    updatedDate: note.updatedAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapPaymentEntity = (payment: Payment) => ({
    id: toIdString(payment.id),
    clientId: toIdString(payment.clientId),
    ...(payment.appointmentId ? { appointmentId: toIdString(payment.appointmentId) } : {}),
    amount: Number(payment.amount),
    status: payment.status,
    createdDate: payment.createdAt?.toISOString() ?? DEFAULT_ISO,
});

export const mapScheduleSlotEntity = (slot: ScheduleSlot) => ({
    id: toIdString(slot.id),
    dayOfWeek: slot.dayOfWeek,
    startTime: slot.startTime,
    endTime: slot.endTime,
    isAvailable: slot.isAvailable,
});

export const resolveClientByUserId = async (userId: string) => {
    const ownerUserId = parseIdParam(userId, "userId");
    return Client.findOne({ where: { ownerUserId } });
};

export const resolveProfessionalByUserId = async (userId: string) => {
    const parsedUserId = parseIdParam(userId, "userId");
    return Professional.findOne({ where: { userId: parsedUserId } });
};
