import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

export interface TableData {
    id: number | string;
    client: string;
    dateTime: string;
    amount: number;
    status: "Completed" | "Pending" | "Failed";
}

interface TablePropsInterface extends React.ComponentProps<typeof Card> {
    data: TableData[];
}

const options = ["Completed", "Pending", "Failed"];

export default function CustomTable({ data, ...props }: TablePropsInterface) {
    return (
        <Card {...props}>
            <CardContent>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client Name</TableHead>
                            <TableHead>Date Time</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell>No Records Found</TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.client}</TableCell>
                                    <TableCell>{row.dateTime}</TableCell>
                                    <TableCell>${row.amount}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell className="flex flex-row">
                                        <Select>
                                            <SelectTrigger className="w-32">
                                                <SelectValue
                                                    placeholder={row.status.toLowerCase()}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {options.map((item) => (
                                                        <SelectItem
                                                            key={item}
                                                            value={item.toLowerCase()}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-red-800 bg-white"
                                        >
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
