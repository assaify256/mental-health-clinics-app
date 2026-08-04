import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCard from "@/custom-components-old/admin/custom-card.admin";
import CustomTable from "@/custom-components-old/admin/payment/custom-table.admin";
import { paymentTable } from "@/dummy-data/table.admin";
import { CreditCard } from "lucide-react";

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
                </Tabs>
            </div>
        </div>
    );
}
