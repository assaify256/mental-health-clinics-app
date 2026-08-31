import CustomTable, { badgify } from "@/custom-components/table/table.main";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { appointmentTable, appointmentStatus } from "@/data/table.admin";
import { Pencil, Trash2 } from "lucide-react";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";
import AddAppointmentAdmin from "@/custom-components/form/add-appointment.form";
import PageTemplate from "@/custom-components/page/template";
import Stack from "@/custom-components/page/stack";

const tableHeader = [
    { key: "client", name: "Client" },
    { key: "professional", name: "Professional" },
    { key: "dateTime", name: "Date and Time" },
    { key: "status", name: "Status" },
    { key: "notes", name: "Notes" },
];

const tabs = [
    {
        key: "all",
        filter: "",
        name: "All",
    },
    {
        key: appointmentStatus.pending,
        filter: "Pending",
        name: "Pending",
    },
    {
        key: appointmentStatus.confirmed,
        filter: "Confirmed",
        name: "Confirmed",
    },
    {
        key: appointmentStatus.completed,
        filter: "Completed",
        name: "Completed",
    },
    {
        key: appointmentStatus.canceled,
        filter: "Canceled",
        name: "Canceled",
    },
];

export default function Page() {
    return (
        <PageTemplate
            title="Manage Appointment"
            description="View and manage all clinic appointments"
        >
            <Stack>
                <Tabs defaultValue="all" className="m-2 flex-1">
                    <div className="flex flex-col max-w-full md:flex-row justify-between">
                        <TabsList>
                            {tabs.map((tab) => (
                                <TabsTrigger key={tab.key} value={tab.key}>
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <AddAppointmentAdmin />
                    </div>
                    {tabs.map((tab) => (
                        <TabsContent
                            key={tab.key}
                            className="mt-6 "
                            value={tab.key}
                        >
                            <Card className="shadow-2xl hidden md:flex">
                                <CardContent>
                                    <CustomTable
                                        data={badgify(
                                            appointmentTable.filter((obj) =>
                                                tab.key === "all"
                                                    ? obj
                                                    : obj.status === tab.key,
                                            ),
                                        )}
                                        headers={tableHeader}
                                    />
                                </CardContent>
                            </Card>
                            {badgify(
                                appointmentTable.filter((obj) =>
                                    tab.key === "all"
                                        ? obj
                                        : obj.status === tab.key,
                                ),
                            ).map((item) => {
                                return (
                                    <article
                                        key={item.id?.toString()}
                                        className="md:hidden my-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                    Client
                                                </p>
                                                <h3 className="mt-1 font-semibold text-gray-900">
                                                    {item.client}
                                                </h3>
                                            </div>

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        {/* Appointment details */}
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    Professional
                                                </p>
                                                <p className="mt-0.5 text-sm text-gray-900">
                                                    {item.professional}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    {/* <CalendarDays className="h-4 w-4 text-gray-400" /> */}
                                                    <span className="text-sm text-gray-700">
                                                        {item.dateTime}
                                                    </span>
                                                </div>

                                                {/* <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">
                                                        {time}
                                                    </span>
                                                </div> */}
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    Notes
                                                </p>
                                                <p className="mt-0.5 text-sm text-gray-900">
                                                    {item.notes}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
                                            <button
                                                type="button"
                                                // onClick={onEdit}
                                                aria-label={`Edit appointment for ${item.client}`}
                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                // onClick={onDelete}
                                                aria-label={`Delete appointment for ${item.client}`}
                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </TabsContent>
                    ))}
                </Tabs>
            </Stack>
        </PageTemplate>
    );
}
