import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCard from "@/custom-components/cards/custom-card";
import CustomTable, { badgify } from "@/custom-components/table/table.main";
import {
    appointmentTable,
    paymentStatus,
    paymentTable,
} from "@/data/table.admin";
import { containerClass, mainDescClass, mainDivClass, mainTitleClass } from "@/styles/classNames.admin";
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
        name: "Failed",
    },
];

export default function Page() {
    return (
        <div className={mainDivClass}>
            <h1 className={mainTitleClass}>Payment Management</h1>
            <p className={mainDescClass}>Track and manage clinic payments</p>
            <div className={containerClass}>
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Revenue"
                    icon={<CreditCard className="text-blue-500"/>}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Pending Payments"
                    preNumber="$"
                    icon={<CreditCard className="text-orange-500"/>}
                />
                <CustomCard
                    className="m-2 md:min-w-48 flex-1"
                    title="Total Transactions"
                    preNumber="$"
                    icon={<CreditCard className="text-green-500"/>}
                />
            </div>
            <div className="flex flex-row">
                <Tabs defaultValue="all" className="flex-1 m-2 my-8">
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
                            className="my-2"
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
            </div>
        </div>
    );
}
