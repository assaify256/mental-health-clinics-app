import { Button } from "@/components/ui/button";
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
import styles from "react-day-picker/style.module.css";

export default function Page() {
    return (
        <PageTemplate
            title="Calendar View"
            description="View all appointments in calendar format"
        >
            <Stack>
                <CustomCalendar
                    className="m-2 shadow-2xl w-full"
                    styles={{
                        day_button: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "18px",
                        },
                    }}
                />
            </Stack>
        </PageTemplate>
    );
}
