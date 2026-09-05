import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomTable from "@/custom-components/table/table.main";
import { homeTable } from "@/data/table.client";

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
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Client Dashboard</h1>
            <p>Welcome back, Here's your health overview.</p>
            <div className="flex flex-row">
                <Card className={`shadow-2xl flex-1 my-4`}>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Active Prescriptions</h2>
                    </CardHeader>
                    <CardContent>
                        <CustomTable data={homeTable} headers={tableHeaders} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
