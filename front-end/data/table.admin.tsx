

export enum paymentStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed",
}

export enum appointmentStatus {
    pending = "pending",
    confirmed = "confirmed",
    completed = "completed",
    canceled = "canceled",
}
export interface HomeTable {
    id: number | string;
    client: string;
    professional: string;
    dateTime: string;
    status: string;
}

export const homeTable = [
    {
        id: 1,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
    },
    {
        id: 2,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
    },
];

export interface AppointmentTable {
    id: string | number;
    client: string;
    professional: string;
    dateTime: string;
    status: appointmentStatus;
    notes: string;
}

export const appointmentTable = [
    {
        id: 1,
        client: "Alice Johnson",
        professional: "John Smith",
        dateTime: "06-06-2026 10:00",
        status: appointmentStatus.pending,
        notes: "Hi",
    },
    {
        id: 2,
        client: "Alice Johnson",
        professional: "Sarah Johnson",
        dateTime: "06-06-2026 10:00",
        status: appointmentStatus.confirmed,
        notes: "Hello",
    },
    {
        id: 3,
        client: "Bob Smith",
        professional: "Badu Wood",
        dateTime: "06-06-2026 10:00",
        status: appointmentStatus.canceled,
        notes: "Hello",
    },
];

export interface PaymentTable {
    id: number | string;
    client: string;
    dateTime: string;
    status: "Completed" | "Failed" | "Pending";
    amount: number;
}

export const paymentTable = [
    {
        id: 1,
        client: "Alice Johnson",
        dateTime: "06-06-2026 10:00",
        amount: 300,
        status: paymentStatus.completed,
    },
    {
        id: 2,
        client: "Alice Johnson",
        dateTime: "06-06-2026 10:00",
        amount: 200,
        status: paymentStatus.pending,
    },
];

