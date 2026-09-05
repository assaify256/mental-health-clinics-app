"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig, chartData } from "@/data/chart.admin";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function AppointmentStatusOverview({
    ...props
}: ContainerProps) {
    return (
        <Card {...props}>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData} className="h-3/4">
                        <Bar dataKey="value" fill="var(--chart-3)" radius={4} />
                        <XAxis
                            tickLine={false}
                            axisLine={false}
                            type="category"
                            dataKey="category"
                        />
                        <YAxis />
                        <CartesianGrid />
                        <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
