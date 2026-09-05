import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    ClipboardMinus,
    ClockCheck,
    ClockPlus,
    PillBottle,
} from "lucide-react";
import CustomTable from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.professional";
import CustomCard from "@/custom-components/cards/custom-card";
import PageTemplate from "@/custom-components/page/template";
import Stack from "@/custom-components/page/stack";

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
    return (
        <PageTemplate
            title="Professional Dashboard"
            description="Welcome back, Dr. Smith!"
        >
            <Stack>
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Appointment"
                    number={0}
                    icon={<Calendar />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Upcoming"
                    number={0}
                    icon={<ClockPlus />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Completed"
                    number={0}
                    icon={<ClockCheck />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Prescriptions"
                    number={0}
                    icon={<PillBottle />}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Assessments"
                    number={0}
                    icon={<ClipboardMinus />}
                />
            </Stack>
            <Stack>
                <Card className={`shadow-2xl m-2 flex-1`}>
                    <CardContent className="flex flex-col">
                        <h2 className="text-lg font-semibold">Quick Menu</h2>
                        <Button className="m-0.5">View Appointments</Button>
                        <Button className="m-0.5">View Payments</Button>
                        <Button className="m-0.5">View calendars</Button>
                        <Button className="m-0.5">View Statistics</Button>
                    </CardContent>
                </Card>
                <Card className={`shadow-2xl flex-2 m-2`}>
                    <CardContent className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Upcoming Appointment
                        </h2>
                        <p>No Upcoming Appointment</p>
                    </CardContent>
                </Card>
            </Stack>
            <Stack>
                <Card className={`shadow-2xl flex-1 m-2`}>
                    <CardContent className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Recent Assessment
                        </h2>
                        <CustomTable data={homeTable} headers={tableHeader} />
                    </CardContent>
                </Card>
            </Stack>
        </PageTemplate>
    );
}
