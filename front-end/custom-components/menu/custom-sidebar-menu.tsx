"use client";

import { Button } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";

export default function CustomSidebarMenu({ role }: { role: "admin" | "professional" | "client" }) {
    const path = usePathname();
    const isHomePath = path === `/dashboard/${role}`;
    const router = useRouter()
    const handleLogout = () => {
        fetch("http://localhost:8080/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
        }).then((response) => router.push("/"))
    }
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
            <SidebarFooter>
                <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
            </SidebarFooter>
        </SidebarMenu>
    );
}
