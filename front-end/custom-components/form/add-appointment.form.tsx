"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ChevronDownIcon, Plus } from "lucide-react";
import { useState } from "react";

const items = [
    { label: "10:00", value: "10:00" },
    { label: "12:00", value: "12:00" },
    { label: "14:00", value: "14:00" },
];

export default function AddAppointmentAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     fetch("http://localhost:8080/api/v1/appointments/", {
    //         method: "POST",
    //         body: {}
    //     })
    //     setIsOpen(false)
    // }
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <form>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Add Appointment</DialogTitle>
                            <DialogDescription>
                                Add appointment manually by admin
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Label>Client Name</Label>
                            <Input />
                            <Label>Professional Name</Label>
                            <Input />
                            <Label>Date and Time Slot</Label>
                            <div className="flex flex-row">
                                <Button
                                    variant={"outline"}
                                    data-empty={!date}
                                    className=" flex-1 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                    onClick={() => setIsCalendarOpen(true)}
                                >
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <ChevronDownIcon data-icon="inline-end" />
                                </Button>
                                <Select items={items}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Time Slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {items.map((item) => (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Popover
                                    open={isCalendarOpen}
                                    onOpenChange={setIsCalendarOpen}
                                >
                                    <PopoverTrigger />
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="center"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            defaultMonth={date}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Label>Notes</Label>
                            <Textarea className="h-24"/>
                        </FieldGroup>
                        <Button type="submit">Add Appointment</Button>
                    </DialogContent>
                </form>
            </Dialog>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <Plus />
                Add Appointment
            </Button>
        </>
    );
}
