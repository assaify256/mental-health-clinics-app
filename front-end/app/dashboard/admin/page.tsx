import { Card, CardContent } from "@/components/ui/card";

import CustomCard from "@/custom-components-old/admin/custom-card.admin";
import CustomChart from "@/custom-components-old/admin/home/custom-chart.admin";
import CustomQuickList from "@/custom-components-old/admin/home/custom-quick-action.admin";
import CustomTable, { badgify } from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.admin";

import {
    Calendar,
    ChartNoAxesCombined,
    CircleCheckBig,
    Users,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const tableHeader = [
    { key: "client", name: "Client" },
    { key: "professional", name: "Professional" },
    { key: "dateTime", name: "Date Time" },
    { key: "status", name: "Status" },
];
const getDashboardData = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("connect.sid")?.value;
    if (!token) {
        redirect("/sign-in");
    }
    const response = await fetch(
        "http://localhost:8080/api/v1/dashboard/admin/overview",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        },
    );
    const dashboardData = await response.json();
    return dashboardData;
};

export default async function Page() {
    const dashboardData = await getDashboardData();

    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
            <div className="flex flex-row">
                <CustomCard
                    className="ml-0"
                    title="Total Appointment"
                    number={dashboardData.data.totalAppointments || 0}
                    icon={<Calendar className="size-8  text-blue-500" />}
                />
                <CustomCard
                    title="Total Clients"
                    number={dashboardData.data.totalClients || 0}
                    icon={<Users className="size-8  text-purple-500" />}
                />
                <CustomCard
                    title="Total Professionals"
                    number={dashboardData.data.totalProfessionals || 0}
                    icon={<Users className="size-8  text-sky-500" />}
                />
                <CustomCard
                    title="Completed"
                    number={dashboardData.data.completedAppointments || 0}
                    icon={<CircleCheckBig className="size-8  text-green-500" />}
                />
                <CustomCard
                    className="mr-0"
                    title="Total Revenue"
                    preNumber="$"
                    number={dashboardData.data.totalRevenue || 0}
                    icon={
                        <ChartNoAxesCombined className="size-8  text-gray-800" />
                    }
                />
            </div>
            <div className="flex flex-row">
                <Card className={`flex-2 mr-4 shadow-2xl`}>
                    <CardContent>
                        <CustomChart />
                    </CardContent>
                </Card>
                <CustomQuickList className="flex-1" />
            </div>
            <div className="flex flex-row">
                <Card className="mt-4 flex-1">
                    <CardContent>
                        <CustomTable
                            headers={tableHeader}
                            data={badgify(homeTable)}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
