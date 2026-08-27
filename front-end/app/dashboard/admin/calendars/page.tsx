import { Button } from "@/components/ui/button";
import CustomCalendar from "@/custom-components-old/admin/calendar/custom-calendar.admin";
import CustomDayButton from "@/custom-components-old/admin/calendar/custom-day-button";
import { containerClass, mainDescClass, mainDivClass, mainTitleClass } from "@/styles/classNames.admin";
import styles from "react-day-picker/style.module.css";

export default function Page() {
    return (
        <div className={mainDivClass}>
            <h1 className={mainTitleClass}>Calendar View</h1>
            <p className={mainDescClass}>View all appointments in calendar format</p>
            <div className={containerClass}>
                <CustomCalendar
                    className="m-2 shadow-2xl"
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
