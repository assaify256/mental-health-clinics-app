import CustomTable from "@/custom-components/admin/appointment/custom-table.admin";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { appointmentTable } from "@/dummy-data/table.admin";

export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Manage Appointment</h1>
            <p>View and manage all clinic appointments</p>
            <div className="flex flex-row mt-8">
                <Tabs defaultValue="all" className="flex-1">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="canceled">Canceled</TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-6 " value="all">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="pending">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Pending";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="confirmed">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Confirmed";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="completed">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Completed";
                            })}
                        />
                    </TabsContent>
                    <TabsContent className="mt-6" value="canceled">
                        <CustomTable
                            className="shadow-2xl"
                            data={appointmentTable.filter((data) => {
                                return data.status === "Cancelled";
                            })}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
