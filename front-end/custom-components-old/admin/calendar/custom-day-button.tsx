"use client";

import { Badge } from "@/components/ui/badge";
import { AppointmentScheduleProps } from "@/data/appointment.admin";
import { DayButton, type DayButtonProps } from "react-day-picker";

interface Props extends DayButtonProps {
    appointmentTime: AppointmentScheduleProps[];
}

export default function CustomDayButton({
    day,
    modifiers,
    appointmentTime,
    ...buttonProps
}: Props) {
    return (
        <div className="flex flex-col border-2 rounded-lg m-2 flex-1 overflow-auto">
            <DayButton
    
                {...buttonProps}
                day={day}
                modifiers={modifiers}
            ></DayButton>
            <ul className="flex flex-col">
                {appointmentTime
                    .filter((date) => date.date === day.isoDate)
                    .map((list) =>
                        list.schedule.map((entry) => (
                            <li key={entry}>
                                <Badge className="rounded-lg text-md py-4 px-8 my-1">{entry}</Badge>
                            </li>
                        )),
                    )}
            </ul>
        </div>
    );
}
