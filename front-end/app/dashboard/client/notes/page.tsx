import { Card, CardContent } from "@/components/ui/card";
import Stack from "@/custom-components/page/stack";
import PageTemplate from "@/custom-components/page/template";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";
import { Pencil, Trash2 } from "lucide-react";

export default function Page() {
    return (
        <PageTemplate
            title="Health Notes"
            description="Write and manage your personal health notes"
        >
            <div className="flex flex-col flex-1">
                <Card className="m-2 md:min-w-48">
                    <CardContent>
                        <span className="flex justify-between">
                            <h2 className="text-lg">Weekly Reflection</h2>
                            <span className="flex">
                                <Pencil className="m-2 size-4" />
                                <Trash2 className="m-2 size-4 text-red-600" />
                            </span>
                        </span>
                        <p className="text-xs text-neutral-500 mb-4">
                            6/16/2025 7:00:00 AM
                        </p>
                        <p>
                            This week was better. I managed my anxiety with the
                            breathing exercises Dr. Smith taught me.
                        </p>
                    </CardContent>
                </Card>
                <Card className="m-2 md:min-w-48">
                    <CardContent>
                        <span className="flex justify-between">
                            <h2 className="text-lg">Weekly Reflection</h2>
                            <span className="flex">
                                <Pencil className="m-2 size-4" />
                                <Trash2 className="m-2 size-4 text-red-600" />
                            </span>
                        </span>
                        <p className="text-xs text-neutral-500 mb-4">
                            6/16/2025 7:00:00 AM
                        </p>
                        <p>
                            This week was better. I managed my anxiety with the
                            breathing exercises Dr. Smith taught me.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    );
}
