export const appointmentSchedule: AppointmentScheduleProps[] = [
    {
        date: "2026-07-13",
        schedule: ["12:00", "13:00"],
    },
];

export interface AppointmentScheduleProps {
    date: string;
    schedule: string[];
}
