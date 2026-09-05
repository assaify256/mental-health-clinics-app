import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CustomCard from "@/custom-components/cards/custom-card";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";
import {
    BriefcaseMedical,
    CalendarCheck,
    CreditCard,
    Users,
} from "lucide-react";
import RevenueTrend from "./revenue-trend.chart";
import AppointmentStatus from "./appointment-status.chart";

export default function Page() {
    return (
        <div className={mainDivClass}>
            <h1 className={mainTitleClass}>Statistics & Analytics</h1>
            <p className={mainDescClass}>Track and manage clinic payments</p>
            <div className={containerClass}>
                <CustomCard
                    title="Total Appointments"
                    className="m-2 md:min-w-48 flex-1"
                    icon={<CalendarCheck />}
                />
                <CustomCard
                    title="Active Clients"
                    className="m-2 md:min-w-48 flex-1"
                    icon={<Users />}
                />
                <CustomCard
                    title="Total Professionals"
                    className="m-2 md:min-w-48 flex-1"
                    icon={<BriefcaseMedical />}
                />
                <CustomCard
                    title="Total Revenue"
                    className="m-2 md:min-w-48 flex-1"
                    icon={<CreditCard />}
                />
            </div>
            <div className={containerClass}>
                <Card className="m-2 flex-1 shadow-2xl">
                    <CardTitle className="mx-4 text-xl font-semibold">Revenue Trend</CardTitle>
                    <CardContent>
                        <RevenueTrend />
                    </CardContent>
                </Card>
                <Card className="m-2 flex-1 shadow-2xl">
                    <CardTitle className="mx-4 text-xl font-semibold">Appointment Status</CardTitle>
                    <CardContent>
                        <AppointmentStatus />
                    </CardContent>
                </Card>
            </div>
            <div className={containerClass}>
                <div className="flex flex-row flex-1">
                    <Card className="m-2 flex-1 shadow-2xl">
                        <CardTitle className="mx-4 text-xl font-semibold">
                            Appointment Summary
                        </CardTitle>
                        <CardContent className="flex flex-col">
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Total Appointments</h3>
                                <p>28</p>
                            </span>
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Completed</h3>
                                <p>24</p>
                            </span>
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Pending</h3>
                                <p>4</p>
                            </span>
                        </CardContent>
                    </Card>
                    <Card className="m-2 flex-1 shadow-2xl">
                        <CardTitle className="mx-4 text-xl font-semibold">Revenue Summary</CardTitle>
                        <CardContent className="flex flex-col">
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Total Revenue</h3>
                                <p>$4200</p>
                            </span>
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Average per Appointment</h3>
                                <p>$150</p>
                            </span>
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Monthly Average</h3>
                                <p>$700</p>
                            </span>
                            <hr></hr>
                            <span className="my-2 flex flex-row justify-between">
                                <h3>Clients per Professional</h3>
                                <p>2</p>
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
