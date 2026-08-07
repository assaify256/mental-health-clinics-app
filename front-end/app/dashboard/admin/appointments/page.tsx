import CustomTable, { badgify } from "@/custom-components/table/table.main";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { appointmentTable, appointmentStatus } from "@/data/table.admin";
import { Badge } from "@/components/ui/badge";

const tableHeader = [
    { key: "client", name: "Client" },
    { key: "professional", name: "Professional" },
    { key: "dateTime", name: "Date and Time" },
    { key: "status", name: "Status" },
    { key: "notes", name: "Notes" },
];


const tabs = [
    {
        key: "all",
        filter: "",
        name: "All",
    },
    {
        key: appointmentStatus.pending,
        filter: "Pending",
        name: "Pending",
    },
    {
        key: appointmentStatus.confirmed,
        filter: "Confirmed",
        name: "Confirmed",
    },
    {
        key: appointmentStatus.completed,
        filter: "Completed",
        name: "Completed",
    },
    {
        key: appointmentStatus.canceled,
        filter: "Canceled",
        name: "Canceled",
    },
];


export default function Page() {
    console.log(appointmentTable);
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Manage Appointment</h1>
            <p>View and manage all clinic appointments</p>
            <div className="flex flex-row mt-8">
                <Tabs defaultValue="all" className="flex-1">
                    <TabsList>
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.key} value={tab.key}>
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab) => (
                        <TabsContent
                            key={tab.key}
                            className="mt-6 "
                            value={tab.key}
                        >
                            <Card className="shadow-2xl">
                                <CardContent>
                                    <CustomTable
                                        data={badgify(
                                            appointmentTable.filter((obj) =>
                                                tab.key === "all"
                                                    ? obj
                                                    : obj.status === tab.key,
                                            ),
                                        )}
                                        headers={tableHeader}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
