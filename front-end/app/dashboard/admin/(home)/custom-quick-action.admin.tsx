import { Calendar, CalendarClock, ChartBar, ChartColumn, CreditCard } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { cardClass } from "@/styles/classNames.admin";



export default function CustomQuickList({...props}){
    return (
        <Card {...props}>
            <CardContent className="flex flex-col">
                <h2 className="text-lg font-semibold">Quick Menu</h2>
                <Button className="m-0.5 justify-baseline"><CalendarClock/>View Appointments</Button>
                <Button className="m-0.5 justify-baseline"><CreditCard/>View Payments</Button>
                <Button className="m-0.5 justify-baseline"><Calendar/>View calendars</Button>
                <Button className="m-0.5 justify-baseline"><ChartColumn/>View Statistics</Button>
            </CardContent>
        </Card>
    )
}