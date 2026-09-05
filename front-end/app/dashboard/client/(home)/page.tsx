import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomCard from "@/custom-components/cards/custom-card";
import Stack from "@/custom-components/page/stack";
import PageTemplate from "@/custom-components/page/template";
import CustomTable from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.client";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";
import { CalendarCheck, CalendarClock, NotepadText, Pill } from "lucide-react";

const tableHeaders = [
    {
        key: "medicine",
        name: "Medicine",
    },
    {
        key: "dosage",
        name: "Dosage",
    },
    {
        key: "frequency",
        name: "Frequency",
    },
    {
        key: "duration",
        name: "Duration",
    },
];

export default function Page() {
    return (
        <PageTemplate
            title="My Health Dashboard"
            description="Welcome back, Alice! Here's your health overview."
        >
            <Stack>
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Appointments"
                    icon={<CalendarClock />}
                    number={0}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Upcoming"
                    icon={<CalendarClock />}
                    number={0}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Completed"
                    icon={<CalendarCheck />}
                    number={0}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Prescription"
                    icon={<Pill />}
                    number={0}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Prescription"
                    icon={<NotepadText />}
                    number={0}
                />
            </Stack>
            <Stack>
                <Card className={`shadow-2xl flex-1 m-2`}>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">
                            Active Prescriptions
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <CustomTable data={homeTable} headers={tableHeaders} />
                    </CardContent>
                </Card>
            </Stack>
        </PageTemplate>
    );
}
