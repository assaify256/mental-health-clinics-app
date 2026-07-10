import CustomCard from "@/custom-components/admin/custom-card.admin";
import CustomChartAdmin from "@/custom-components/admin/home/custom-chart.admin";
import CustomQuickList from "@/custom-components/admin/home/custom-quick-action.admin";
import CustomTableAdminHome from "@/custom-components/admin/home/custom-table-home.admin";
import { homeTable } from "@/dummy-data/table.admin";

import {
    Calendar,
    ChartNoAxesCombined,
    CircleCheckBig,
    Users,
} from "lucide-react";




export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
            <div className="flex flex-row">
                <CustomCard
                    className="ml-0"
                    title="Total Appointment"
                    number={0}
                    icon={<Calendar className="size-8  text-blue-500" />}
                />
                <CustomCard
                    title="Total Clients"
                    number={0}
                    icon={<Users className="size-8  text-purple-500" />}
                />
                <CustomCard
                    title="Total Professionals"
                    number={0}
                    icon={<Users className="size-8  text-sky-500" />}
                />
                <CustomCard
                    title="Completed"
                    number={0}
                    icon={<CircleCheckBig className="size-8  text-green-500" />}
                />
                <CustomCard
                    className="mr-0"
                    title="Total Revenue"
                    preNumber="$"
                    number={0}
                    icon={
                        <ChartNoAxesCombined className="size-8  text-gray-800" />
                    }
                />
            </div>
            <div className="flex flex-row">
                <CustomChartAdmin className="flex-2 mr-4" />
                <CustomQuickList className="flex-1" />
            </div>
            <div className="flex flex-row">
                <CustomTableAdminHome
                    className="mt-4 flex-1"
                    data={homeTable}
                />
            </div>
        </div>
    );
}
