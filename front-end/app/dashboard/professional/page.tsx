import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomCard from "@/custom-components-old/admin/custom-card.admin";
import {
    Calendar,
    ClipboardMinus,
    ClockCheck,
    ClockPlus,
    PillBottle,
} from "lucide-react";
import CustomTable from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.professional";

const tableHeader = [
    {
        key: "client",
        name: "Client",
    },
    {
        key: "type",
        name: "Type",
    },
    {
        key: "score",
        name: "Score",
    },
    {
        key: "date",
        name: "Date",
    },
];

export default function Page() {
    let data: Array<Object> = [];
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
            <div className="flex flex-row">
                <CustomCard
                    className="ml-0"
                    title="Total Appointment"
                    number={0}
                    icon={<Calendar />}
                />
                <CustomCard title="Upcoming" number={0} icon={<ClockPlus />} />
                <CustomCard
                    title="Completed"
                    number={0}
                    icon={<ClockCheck />}
                />
                <CustomCard
                    title="Prescriptions"
                    number={0}
                    icon={<PillBottle />}
                />
                <CustomCard
                    className="mr-0"
                    title="Assessments"
                    number={0}
                    icon={<ClipboardMinus />}
                />
            </div>
            <div className="flex flex-row">
                <div className="flex-1">
                    <Card className={`shadow-2xl mr-4 my-4`}>
                        <CardContent className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                Quick Menu
                            </h2>
                            <Button className="m-0.5">View Appointments</Button>
                            <Button className="m-0.5">View Payments</Button>
                            <Button className="m-0.5">View calendars</Button>
                            <Button className="m-0.5">View Statistics</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-2 flex flex-col">
                    <Card className={`shadow-2xl flex-1 my-4`}>
                        <CardContent className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                Upcoming Appointment
                            </h2>
                            <p>No Upcoming Appointment</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-row">
                <Card className={`shadow-2xl flex-1 my-4`}>
                    <CardContent className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Recent Assessment
                        </h2>
                        <CustomTable data={homeTable} headers={tableHeader} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
