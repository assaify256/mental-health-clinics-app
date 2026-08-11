"use client";

import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItem } from "@/data/menu-nav-item";
import {
    CalendarClock,
    CalendarDays,
    ChartColumn,
    CreditCard,
    House,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function CustomSidebarMenu({ role }: { role: "admin" | "professional" | "client" }) {
    const path = usePathname();
    const isHomePath = path === `/dashboard/${role}`;
    return (
        <SidebarMenu>
            {menuItem[role].map((item) => (
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
            <SidebarFooter>A</SidebarFooter>
        </SidebarMenu>
    );
}
