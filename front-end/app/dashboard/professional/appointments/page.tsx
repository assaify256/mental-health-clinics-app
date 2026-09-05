<<<<<<< HEAD
import { Card } from "@/components/ui/card";
import Stack from "@/custom-components/page/stack";
import PageTemplate from "@/custom-components/page/template";

export default function Page() {
    return (
        <PageTemplate
            title="My Appointments"
            description="View and manage your appointments"
        >
            <Stack>
                <Card className="flex-1 shadow-2xl m-2"></Card>
                <Card className="flex-2 shadow-2xl m-2"></Card>
            </Stack>
        </PageTemplate>
=======
export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <p>Welcome back! Here's an overview of your clinic.</p>
        </div>
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
    );
}
