

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomTable, { TableData } from "./custom-table.admin";

const dummyTableData: TableData[] = [
    {
        id: 1,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        notes: "Hi"
    },
    {
        id: 2,
        client: "Alice Johnson",
        professional: "alice@example.com",
        dateTime: "06-06-2026 10:00",
        status: "Pending",
        notes: "Hello"
    },
    
];

export default function CustomTab() {
    return (
        <Tabs>
            <TabsList defaultValue="all">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <CustomTable data={dummyTableData}/>
            </TabsContent>
        </Tabs>
    );
}
