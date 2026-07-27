import bcrypt from "bcryptjs";
import type {
    AppointmentEntity,
    AssessmentEntity,
    ClientEntity,
    ClinicalRecordEntity,
    ClientNoteEntity,
    PaymentEntity,
    PrescriptionEntity,
    ProfessionalEntity,
    ProfessionalSchedule,
    ScheduleSlot,
    UserEntity,
} from "../types/api.types.ts";

const nowIso = () => new Date().toISOString();

let sequence = 100;
export const nextId = (prefix: string) => `${prefix}-${sequence++}`;

export const users: UserEntity[] = [
    {
        id: "user-admin-1",
        email: "admin@clinic.local",
        passwordHash: bcrypt.hashSync("password123", 10),
        firstName: "System",
        lastName: "Admin",
        role: "admin",
        createdAt: nowIso(),
    },
    {
        id: "user-pro-1",
        email: "pro@clinic.local",
        passwordHash: bcrypt.hashSync("password123", 10),
        firstName: "Grace",
        lastName: "Counsellor",
        role: "professional",
        createdAt: nowIso(),
    },
    {
        id: "user-client-1",
        email: "client@clinic.local",
        passwordHash: bcrypt.hashSync("password123", 10),
        firstName: "Alex",
        lastName: "Client",
        role: "client",
        createdAt: nowIso(),
    },
];

export const professionals: ProfessionalEntity[] = [
    {
        id: "pro-1",
        userId: "user-pro-1",
        firstName: "Grace",
        lastName: "Counsellor",
        specialty: "Psychotherapy",
        licenseNumber: "LIC-1001",
        bio: "Trauma-informed therapist",
    },
];

export const clients: ClientEntity[] = [
    {
        id: "client-1",
        userId: "user-client-1",
        firstName: "Alex",
        lastName: "Client",
        medicalHistory: "Mild anxiety",
    },
];

export const appointments: AppointmentEntity[] = [
    {
        id: "appt-1",
        clientId: "client-1",
        professionalId: "pro-1",
        scheduledDate: new Date().toISOString(),
        scheduledTime: "10:00",
        status: "pending",
        notes: "Initial consultation",
        createdAt: nowIso(),
    },
];

export const assessments: AssessmentEntity[] = [];
export const prescriptions: PrescriptionEntity[] = [];
export const records: ClinicalRecordEntity[] = [];
export const notes: ClientNoteEntity[] = [];

export const payments: PaymentEntity[] = [
    {
        id: "payment-1",
        clientId: "client-1",
        appointmentId: "appt-1",
        amount: 750000,
        status: "pending",
        createdDate: nowIso(),
    },
];

const defaultSlots: ScheduleSlot[] = [
    {
        id: "slot-1",
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "12:00",
        isAvailable: true,
    },
];

export const schedules: ProfessionalSchedule[] = [
    {
        professionalId: "pro-1",
        slots: defaultSlots,
    },
];

export const resolveClientByUserId = (userId: string) =>
    clients.find((client) => client.userId === userId);

export const resolveProfessionalByUserId = (userId: string) =>
    professionals.find((professional) => professional.userId === userId);
