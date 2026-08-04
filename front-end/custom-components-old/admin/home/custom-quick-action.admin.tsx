import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";



export default function CustomQuickList({className=""}){
    return (
        <Card className={`${className} shadow-2xl`}>
            <CardContent className="flex flex-col">
                <h2>Quick Menu</h2>
                <Button className="m-0.5">View Appointments</Button>
                <Button className="m-0.5">View Payments</Button>
                <Button className="m-0.5">View calendars</Button>
                <Button className="m-0.5">View Statistics</Button>
            </CardContent>
        </Card>
    )
}