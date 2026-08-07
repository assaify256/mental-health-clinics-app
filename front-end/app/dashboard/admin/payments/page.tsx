import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCard from "@/custom-components-old/admin/custom-card.admin";
import CustomTable, { badgify } from "@/custom-components/table/table.main";
import {
    appointmentTable,
    paymentStatus,
    paymentTable,
} from "@/data/table.admin";
import { CreditCard } from "lucide-react";

const tableHeader = [
    { key: "client", name: "Client" },
    { key: "dateTime", name: "Date and Time" },
    { key: "amount", name: "Amount" },
    { key: "status", name: "Status" },
];

const tabs = [
    {
        key: "all",
        filter: "",
        name: "All",
    },
    {
        key: paymentStatus.pending,
        filter: "pending",
        name: "Pending",
    },
    {
        key: paymentStatus.completed,
        filter: "Completed",
        name: "Completed",
    },
    {
        key: paymentStatus.failed,
        filter: "Failed",
        name: "failed",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Payment Management</h1>
            <p>Track and manage clinic payments</p>
            <div className="flex flex-row mt-8">
                <CustomCard
                    className="ml-0"
                    title="Total Revenue"
                    icon={<CreditCard />}
                />
                <CustomCard
                    title="Pending Payments"
                    preNumber="$"
                    icon={<CreditCard />}
                />
                <CustomCard
                    className="mr-0"
                    title="Total Transactions"
                    preNumber="$"
                    icon={<CreditCard />}
                />
            </div>
            <div className="flex flex-row">
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
                                            paymentTable.filter((obj) =>
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
                {/* <Tabs defaultValue="all" className="flex-1">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="failed">Failed</TabsTrigger>{" "}
                    </TabsList>
                    <TabsContent value="all">
                        <CustomTable
                            className="shadow-2xl"
                            data={paymentTable}
                        />
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
                </Tabs> */}
            </div>
        </div>
    );
}
