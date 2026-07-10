import CustomCard from "@/custom-components/admin/custom-card.admin";
import CustomTab from "@/custom-components/admin/payment/custom-tab.admin";
import { CreditCard } from "lucide-react";

export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Payment Management</h1>
            <p>Track and manage clinic payments</p>
            <div className="flex flex-row mt-8">
                <CustomCard className="ml-0" title="Total Revenue" icon={<CreditCard />} />
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
                <CustomTab className="flex-1"/>
            </div>
        </div>
    );
}
