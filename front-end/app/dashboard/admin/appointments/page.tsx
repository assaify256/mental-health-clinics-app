import CustomTable, { badgify } from "@/custom-components/table/table.main";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { appointmentTable, paymentStatus } from "@/dummy-data/table.admin";
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
        key: paymentStatus.pending,
        filter: "Pending",
        name: "Pending",
    },
    {
        key: paymentStatus.confirmed,
        filter: "Confirmed",
        name: "Confirmed",
    },
    {
        key: paymentStatus.completed,
        filter: "Completed",
        name: "Completed",
    },
    {
        key: paymentStatus.canceled,
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

                    {/* <TabsContent className="mt-6" value="pending">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Pending";
                            })}
                            headers={tableHeader}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="confirmed">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Confirmed";
                            })}
                            headers={tableHeader}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="completed">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Completed";
                            })}
                            headers={tableHeader}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="canceled">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Cancelled";
                            })}
                            headers={tableHeader}
                        />
                    </TabsContent> */}
                </Tabs>
            </div>
        </div>
    );
}
