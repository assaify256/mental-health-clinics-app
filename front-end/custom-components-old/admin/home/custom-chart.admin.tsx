"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { Card, CardContent } from "../../../components/ui/card";
import { chartConfig, chartData } from "@/data/chart.admin";

export default function CustomChart({...props}) {
    return (
        <ChartContainer config={chartConfig} {...props}>
            <BarChart data={chartData}>
                <Bar
                    dataKey="completed"
                    fill="var(--color-desktop)"
                    radius={4}
                />
                <Bar dataKey="pending" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
