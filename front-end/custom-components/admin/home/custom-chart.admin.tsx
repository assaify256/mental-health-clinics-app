"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { Card, CardContent } from "../../../components/ui/card";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

const chartData = [{ completed: 186, pending: 80 }];

export default function CustomChart({ className = "" }) {
    return (
        <Card className={`${className} shadow-2xl`}>
            <CardContent>
                <ChartContainer config={chartConfig} className={`h-100`}>
                    <BarChart data={chartData}>
                        <Bar
                            dataKey="completed"
                            fill="var(--color-desktop)"
                    
                            radius={4}
                        />
                        <Bar
                            dataKey="pending"
                            fill="var(--color-mobile)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
