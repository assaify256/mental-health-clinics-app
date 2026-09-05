"use client";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import CustomDayButton from "./custom-day-button";
import { CalendarDay } from "react-day-picker";
import { appointmentSchedule } from "@/dummy-data/appointment.admin";

export default function CustomCalendar({
    ...props
}: ComponentPropsWithoutRef<typeof Calendar>) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
        <Calendar
            {...props}
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border flex-1"
            components={{
                DayButton: ({ ...props }) => (
                    <CustomDayButton
                        {...props}
                        appointmentTime={appointmentSchedule}
                    />
                )
                
            }}
            styles={{day: {display: "flex"}}}

        />
    );
}
