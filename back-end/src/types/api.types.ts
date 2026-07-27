export type UserRole = "admin" | "professional" | "client";

export type AppointmentStatus =
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled";

export type PaymentStatus = "pending" | "completed" | "failed";

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}

export interface UserEntity {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    createdAt: string;
}

export interface ProfessionalEntity {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    specialty: string;
    licenseNumber: string;
    bio?: string;
    qualifications?: string;
    avatar?: string;
}

export interface ClientEntity {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    medicalHistory?: string;
    emergencyContact?: string;
    avatar?: string;
}

export interface AppointmentEntity {
    id: string;
    clientId: string;
    professionalId: string;
    scheduledDate: string;
    scheduledTime: string;
    status: AppointmentStatus;
    notes?: string;
    createdAt: string;
}

export interface AssessmentEntity {
    id: string;
    professionalId: string;
    clientId: string;
    assessmentType: string;
    score?: number;
    notes?: string;
    createdDate: string;
}

export interface PrescriptionEntity {
    id: string;
    professionalId: string;
    clientId: string;
    appointmentId?: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
    issuedDate: string;
}

export interface ClinicalRecordEntity {
    id: string;
    clientId: string;
    professionalId?: string;
    recordType: string;
    content: string;
    createdDate: string;
}

export interface ClientNoteEntity {
    id: string;
    clientId: string;
    title: string;
    content: string;
    createdDate: string;
    updatedDate: string;
}

export interface PaymentEntity {
    id: string;
    clientId: string;
    appointmentId?: string;
    amount: number;
    status: PaymentStatus;
    createdDate: string;
}

export interface ScheduleSlot {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface ProfessionalSchedule {
    professionalId: string;
    slots: ScheduleSlot[];
}
