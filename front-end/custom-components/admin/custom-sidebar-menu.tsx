"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
    CalendarClock,
    CalendarDays,
    ChartColumn,
    CreditCard,
    House,
} from "lucide-react";
import { usePathname } from "next/navigation";
const menuItem = {
    admin: [
        {
            title: "Home",
            icon: <House />,
            url: "/dashboard/admin",
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
};
export default function CustomSidebarMenu() {
    const path = usePathname();
    const role = "admin";
    const isHomePath = path === `/dashboard/${role}`;
    return (
        <SidebarMenu>
            {menuItem.admin.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        variant={"outline"}
                        className="py-6 my-1"
                        isActive={
                            !isHomePath
                                ? item.url.startsWith(path)
                                : path === item.url
                        }
                    >
                        <a href={item.url}>
                            {item.icon}
                            <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
