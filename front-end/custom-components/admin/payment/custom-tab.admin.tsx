import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomTable from "./custom-table.admin";
import { paymentTable } from "@/dummy-data/table.admin";

export default function CustomTab({ ...props }) {
    return (
        <Tabs {...props}>
            <TabsList defaultValue="all">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>{" "}
            </TabsList>
            <TabsContent value="all">
                <CustomTable className="shadow-2xl" data={paymentTable} />
            </TabsContent>
            <TabsContent className="mt-6" value="completed">
                <CustomTable
                    className="shadow-2xl"
                    data={paymentTable.filter((data) => {
                        return data.status === "Completed";
                    })}
                />
            </TabsContent>
            <TabsContent className="mt-6" value="pending">
                <CustomTable
                    className="shadow-2xl"
                    data={paymentTable.filter((data) => {
                        return data.status === "Pending";
                    })}
                />
            </TabsContent>
            <TabsContent className="mt-6" value="failed">
                <CustomTable
                    className="shadow-2xl"
                    data={paymentTable.filter((data) => {
                        return data.status === "Failed";
                    })}
                />
            </TabsContent>
        </Tabs>
    );
}
