import { House } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";

export default function CustomCard({
    title = "Title",
    icon = <House />,
    number = 0,
    preNumber = "",
    className = ""
}) {
    return (
        <Card className={`flex-1 my-4 mx-2 shadow-2xl ${className}`}>
            <CardContent className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-md mb-4 text-gray-500">{title}</h2>
                    <p className="text-3xl">
                        {preNumber}
                        {number}
                    </p>
                </div>
                <div>{icon}</div>
            </CardContent>
        </Card>
    );
}
