import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import CustomTable from "@/custom-components/table/table.main";
import {assessmentTable } from "@/data/table.professional";

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
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
            <div className="flex flex-row">
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
            </div>
        </div>
    );
}
