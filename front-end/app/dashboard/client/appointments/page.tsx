import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Stack from "@/custom-components/page/stack";
import PageTemplate from "@/custom-components/page/template";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";

export default function Page() {
    return (
        <PageTemplate
            title="My Appointments"
            description="Book and manage your clinic appointments"
        >
            <Stack>
                <Card className="m-2 md:min-w-48 flex-1">
                    <CardTitle className="mx-4">
                        Upcoming Appointments
                    </CardTitle>
                    <CardContent>No upcoming appointments</CardContent>
                </Card>
            </Stack>
            <Stack>
                <Card className="m-2 md:min-w-48 flex-1">
                    <CardTitle className="mx-4">Past Appointments</CardTitle>
                    <CardContent>
                        <Card className="m-2 shadow-lg bg-neutral-100">
                            <CardContent>
                                <h2 className="text-xl">Dr. Smith</h2>
                                <p className="text-neutral-500">
                                    Clinical Psychologist
                                </p>
                                <span className="flex justify-between mt-6">
                                    <p>20-06-2026</p>
                                    <Badge>Completed</Badge>
                                </span>
                            </CardContent>
                        </Card>
                        <Card className="m-2 shadow-lg bg-neutral-100">
                            <CardContent>
                                <h2 className="text-xl">Dr. Johnson</h2>
                                <p className="text-neutral-500">Psychiatrist</p>
                                <span className="flex justify-between mt-6">
                                    <p>20-06-2026</p>
                                    <Badge>Completed</Badge>
                                </span>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </Stack>
        </PageTemplate>
    );
}
