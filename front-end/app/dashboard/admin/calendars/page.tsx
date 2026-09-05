import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import CustomCalendar from "@/custom-components-old/admin/calendar/custom-calendar.admin";
import CustomDayButton from "@/custom-components-old/admin/calendar/custom-day-button";
import Stack from "@/custom-components/page/stack";
import PageTemplate from "@/custom-components/page/template";
import {
    containerClass,
    mainDescClass,
    mainDivClass,
    mainTitleClass,
} from "@/styles/classNames.admin";
=======
import CustomCalendar from "@/custom-components/admin/calendar/custom-calendar.admin";
import CustomDayButton from "@/custom-components/admin/calendar/custom-day-button";
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
import styles from "react-day-picker/style.module.css";

export default function Page() {
    return (
<<<<<<< HEAD
        <PageTemplate
            title="Calendar View"
            description="View all appointments in calendar format"
        >
            <Stack>
                <CustomCalendar
                    className="m-2 shadow-2xl w-full"
=======
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Calendar View</h1>
            <p>View all appointments in calendar format</p>
            <div className="flex flex-row mt-8">
                <CustomCalendar
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
                    styles={{
                        day_button: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "18px",
                        },
                    }}
                />
<<<<<<< HEAD
            </Stack>
        </PageTemplate>
=======
            </div>
        </div>
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
    );
}
