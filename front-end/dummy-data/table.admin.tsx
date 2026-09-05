export interface HomeTable {
    id: number | string;
    client: string;
    professional: string;
    dateTime: string;
    status: "Pending" | "Confirmed" | "Completed";
}

export const homeTable: HomeTable[] = [
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
    status: "Pending" | "Completed" | "Cancelled" | "Confirmed";
    notes: string;
}

export const appointmentTable: AppointmentTable[] = [
    {
        id: 1,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        notes: "Hi",
    },
    {
        id: 2,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Confirmed",
        notes: "Hello",
    },
    {
        id: 3,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Cancelled",
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

export const paymentTable: PaymentTable[] = [
    {
        id: 1,
        client: "Alice Johnson",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        amount: 300,
    },
    {
        id: 2,
        client: "Alice Johnson",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        amount: 200,
    },
];
