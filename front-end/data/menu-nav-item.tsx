import {
    Calendar,
    CalendarClock,
    CalendarDays,
    ChartColumn,
    ClipboardCheck,
    ClipboardClock,
    ClipboardList,
    ClipboardPen,
    CreditCard,
    House,
    NotebookText,
    Pill,
} from "lucide-react";

export const menuItem = {
    admin: [
        {
            title: "Home",
            icon: <House />,
            url: "/dashboard/admin/",
        },
        {
            title: "Appointments",
            icon: <CalendarClock />,
            url: "/dashboard/admin/appointments",
        },
        {
            title: "Payments",
            icon: <CreditCard />,
            url: "/dashboard/admin/payments",
        },
        {
            title: "Calendars",
            icon: <CalendarDays />,
            url: "/dashboard/admin/calendars",
        },
        {
            title: "Statistics",
            icon: <ChartColumn />,
            url: "/dashboard/admin/statistics",
        },
    ],
    professional: [
        {
            title: "Home",
            icon: <House />,
            url: "/dashboard/professional/",
        },
        {
            title: "Appointments",
            icon: <CalendarClock />,
            url: "/dashboard/professional/appointments",
        },
        {
            title: "Prescriptions",
            icon: <Pill />,
            url: "/dashboard/professional/prescriptions",
        },
        {
            title: "Assessments",
            icon: <ClipboardPen />,
            url: "/dashboard/professional/assessments",
        },
        {
            title: "records",
            icon: <ClipboardList />,
            url: "/dashboard/professional/records",
        },
        {
            title: "Schedule",
            icon: <ClipboardClock />,
            url: "/dashboard/professional/schedule",
        },
    ],
    client: [
        {
            title: "Home",
            icon: <House />,
            url: "/dashboard/client/",
        },
        {
            title: "Appointments",
            icon: <Calendar />,
            url: "/dashboard/client/appointments",
        },
        {
            title: "Notes",
            icon: <NotebookText />,
            url: "/dashboard/client/notes",
        },
        {
            title: "Results",
            icon: <ClipboardCheck />,
            url: "/dashboard/client/results",
        },
        {
            title: "Payments",
            icon: <CreditCard/>,
            url: "/dashboard/client/payments",
        },
        {
            title: "Schedule",
            icon: <CalendarClock />,
            url: "/dashboard/client/schedule",
        },
    ],
};
