import { House } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

export default async function CustomCard({
    title = "Title",
    icon = <House />,
    number = 0,
    preNumber = "",
    className = "",
    endpoint = "/",
}) {
    
    try {
        const response = await fetch(`http://localhost:8080${endpoint}`, {
        credentials: "include",
        method: "GET",
    });
    const data = await response.json()
    number = data
    } catch (error) {
        console.log(error)
    }
    
    return (
        <Card className={`shadow-2xl ${className}`}>
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
