import { Card, CardContent } from "@/components/ui/card";

import CustomCard from "@/custom-components/cards/custom-card";
import CustomQuickList from "@/app/dashboard/admin/(home)/custom-quick-action.admin";
import CustomTable, { badgify } from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.admin";
import { mainCardData } from "@/data/admin-role/home";

import {
    Calendar,
    ChartNoAxesCombined,
    CircleCheckBig,
    Users,
} from "lucide-react";
import AppointmentStatusOverview from "./appointment-status-overview.chart";
import PageTemplate from "@/custom-components/page/template";
import Stack from "@/custom-components/page/stack";
import { cardClass } from "@/styles/classNames.admin";

const tableHeader = [
    { key: "client", name: "Client" },
    { key: "professional", name: "Professional" },
    { key: "dateTime", name: "Date Time" },
    { key: "status", name: "Status" },
];

export default async function Page() {
    return (
        <PageTemplate
            title="Admin Dashboard"
            description="Welcome back! Here's an overview of your clinic."
        >
            <Stack>
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Appointment"
                    number={mainCardData.totalAppointments}
                    icon={<Calendar className="size-8  text-blue-500" />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Clients"
                    number={mainCardData.totalClients}
                    icon={<Users className="size-8  text-purple-500" />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Professionals"
                    number={mainCardData.totalProfessionals}
                    icon={<Users className="size-8  text-sky-500" />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Completed"
                    number={mainCardData.completed}
                    icon={<CircleCheckBig className="size-8  text-green-500" />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Revenue"
                    preNumber="$"
                    number={mainCardData.totalRevenue}
                    icon={
                        <ChartNoAxesCombined className="size-8  text-gray-800" />
                    }
                />
            </Stack>
            <Stack>
                <AppointmentStatusOverview className={`${cardClass} flex-2`}/>
                <CustomQuickList className={`${cardClass} flex-1`}/>
            </Stack>
            <Stack>
                <Card className="flex-1 m-2">
                    <CardContent>
                        <CustomTable
                            headers={tableHeader}
                            data={badgify(homeTable)}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </PageTemplate>
    );
}
