import CustomTable, {
    TableData,
} from "@/components/custom-components/admin/appointment/custom-table.admin";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

const dummyTableData: TableData[] = [
    {
        id: 1,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        notes: "Hi",
    },
    {
        id: 2,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Confirmed",
        notes: "Hello",
    },
    {
        id: 3,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Canceled",
        notes: "Hello",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Manage Appointment</h1>
            <p>View and manage all clinic appointments</p>
            <div className="flex flex-row mt-8">
                <Tabs className="flex-1 ">
                    <TabsList defaultValue="all">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="canceled">Canceled</TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-6" value="all">
                        <CustomTable data={dummyTableData} />
                    </TabsContent>
                    <TabsContent className="mt-6" value="pending">
                        <CustomTable
                            data={dummyTableData.filter((data) => {
                                return data.status === "Pending";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="confirmed">
                        <CustomTable
                            data={dummyTableData.filter((data) => {
                                return data.status === "Confirmed";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="completed">
                        <CustomTable
                            data={dummyTableData.filter((data) => {
                                return data.status === "Completed";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="canceled">
                        <CustomTable
                            data={dummyTableData.filter((data) => {
                                return data.status === "Canceled";
                            })}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
