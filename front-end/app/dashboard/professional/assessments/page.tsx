import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import CustomTable from "@/custom-components/table/table.main";
import { assessmentTable } from "@/data/table.professional";
import PageTemplate from "@/custom-components/page/template";
import Stack from "@/custom-components/page/stack";

const tableHeader = [
    {
        key: "client",
        name: "Client",
    },
    {
        key: "assessmentType",
        name: "Assessment Type",
    },
    {
        key: "score",
        name: "Score",
    },
    {
        key: "notes",
        name: "Notes",
    },
    {
        key: "date",
        name: "Date",
    },
];

export default function Page() {
    return (
        <PageTemplate
            title="Clinical Assessments"
            description="Create and manage client assessments"
        >
            <Stack>
                <Card className={`shadow-2xl flex-1 my-4`}>
                    <CardContent className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Active Prescriptions
                        </h2>
                        <CustomTable
                            data={assessmentTable}
                            headers={tableHeader}
                            actions={[
                                {
                                    name: "delete",
                                    icon: <Trash />,
                                    className: "bg-red-800",
                                },
                            ]}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </PageTemplate>
    );
}
