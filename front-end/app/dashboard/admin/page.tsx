import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CustomCard from "@/custom-components/admin/custom-card.admin";
import CustomChart from "@/custom-components/admin/home/custom-chart.admin";
import CustomQuickList from "@/custom-components/admin/home/custom-quick-action.admin";
import { chartConfig, chartData } from "@/dummy-data/chart.admin";
import { homeTable } from "@/dummy-data/table.admin";

import {
    Calendar,
    ChartNoAxesCombined,
    CircleCheckBig,
    Users,
} from "lucide-react";
import { Bar, BarChart } from "recharts";

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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client Name</TableHead>
                                    <TableHead>Professional Name</TableHead>
                                    <TableHead>Date Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {homeTable.length === 0 ? (
                                    <TableRow>No Records Found</TableRow>
                                ) : (
                                    homeTable.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.client}</TableCell>
                                            <TableCell>
                                                {row.professional}
                                            </TableCell>
                                            <TableCell>
                                                {row.dateTime}
                                            </TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
