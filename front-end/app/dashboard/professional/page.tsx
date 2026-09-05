import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CustomCard from "@/custom-components/admin/custom-card.admin";
import {
    Calendar,
    ClipboardMinus,
    ClockCheck,
    ClockPlus,
    PillBottle,
} from "lucide-react";

export default function Page() {
    let data: Array<Object> = [];
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
            <div className="flex flex-row">
                <CustomCard
                    className="ml-0"
                    title="Total Appointment"
                    number={0}
                    icon={<Calendar />}
                />
                <CustomCard title="Upcoming" number={0} icon={<ClockPlus />} />
                <CustomCard
                    title="Completed"
                    number={0}
                    icon={<ClockCheck />}
                />
                <CustomCard
                    title="Prescriptions"
                    number={0}
                    icon={<PillBottle />}
                />
                <CustomCard
                    className="mr-0"
                    title="Assessments"
                    number={0}
                    icon={<ClipboardMinus />}
                />
            </div>
            <div className="flex flex-row">
                <div className="flex-1">
                    <Card className={`shadow-2xl mr-4 my-4`}>
                        <CardContent className="flex flex-col">
                            <h2>Quick Menu</h2>
                            <Button className="m-0.5">View Appointments</Button>
                            <Button className="m-0.5">View Payments</Button>
                            <Button className="m-0.5">View calendars</Button>
                            <Button className="m-0.5">View Statistics</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-2 flex flex-col">
                    <Card className={`shadow-2xl flex-1 my-4`}>
                        <CardContent className="flex flex-col">
                            <h2>Upcoming Appointment</h2>
                            <p>No Upcoming Appointment</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-row">
                <Card className={`shadow-2xl flex-1 my-4`}>
                    <CardContent className="flex flex-col">
                        <h2>Recent Assessment</h2>
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length === 0 ? (
                                    <TableRow>
                                        <TableCell>No Records Found</TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.client}</TableCell>
                                            <TableCell>
                                                {row.professional}
                                            </TableCell>
                                            <TableCell>
                                                {row.dateTime}
                                            </TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
