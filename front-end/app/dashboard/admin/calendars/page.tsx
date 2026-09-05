import { Button } from "@/components/ui/button";
import CustomCalendar from "@/custom-components/admin/calendar/custom-calendar.admin";
import CustomDayButton from "@/custom-components/admin/calendar/custom-day-button";
import styles from "react-day-picker/style.module.css";

export default function Page() {
    return (
        <div className="flex flex-col p-8">
            <h1 className="text-3xl">Calendar View</h1>
            <p>View all appointments in calendar format</p>
            <div className="flex flex-row mt-8">
                <CustomCalendar
                    styles={{
                        day_button: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "18px",
                        },
                    }}
                />
            </div>
        </div>
    );
}
