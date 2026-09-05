"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    PieSectorShapeProps,
    Sector,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const chartConfig: ChartConfig = {
    completed: {
        label: "Completed",
        color: "oklch(0.438 0.218 303.724)",
    },
    pending: {
        label: "Pending",
        color: "#2563eb",
    },
};

const colors = ["oklch(0.438 0.218 303.724)", "oklch(0.627 0.265 303.9)"];

const chartData = [
    {
        name: "completed",
        value: 30,
    },
    {
        name: "pending",
        value: 5,
    },
];

const MyCustomPie = (props: PieSectorShapeProps) => <Sector {...props} fill={colors[props.index % colors.length]} />;

export default function AppointmentStatus() {
    return (
        <ChartContainer config={chartConfig}>
            <PieChart data={chartData}>
                <Pie dataKey={"value"} shape={MyCustomPie}>

                </Pie>
                <Tooltip />
            </PieChart>
        </ChartContainer>
    );
}
