import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
    completed: {
        label: "Completed",
        color: "#2563eb",
    },
    pending: {
        label: "Pending",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

export const chartData = [
    { category: "pending", value: 400 },
    { category: "completed", value: 300 },
];
