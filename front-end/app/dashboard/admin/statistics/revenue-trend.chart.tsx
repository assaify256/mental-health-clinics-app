"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { generateMockData, RechartsDevtools } from "@recharts/devtools";

const chartConfig: ChartConfig = {
    revenue: {
        label: "Revenue",
        color: "#2563eb",
    },
};

const chartData = [
    {
        month: "January",
        value: 4000,
    },
    {
        month: "February",
        value: 4500,
    },
    {
        month: "March",
        value: 4200,
    },
    {
        month: "April",
        value: 4000,
    },
    {
        month: "May",
        value: 4700,
    },
];

export default function RevenueTrend() {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={chartData}>
                <Line type={"bump"} dataKey={"value"} />
                <Tooltip/>
                <XAxis dataKey={"month"}/>
                <YAxis dataKey={"value"}/>
                <CartesianGrid/>
            </LineChart>
        </ChartContainer>
    );
}
