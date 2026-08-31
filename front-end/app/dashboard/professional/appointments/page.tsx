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
    );
}
