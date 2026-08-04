import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";

interface Header {
    name: string;
    key: string;
}

interface CustomTable {
    headers: Header[];
    data: Record<string, string | number | null | React.ReactNode>[];
}

export default function CustomTable({ headers, data, ...props }: CustomTable) {
    for (let d of data) {
        d.status = <Badge>{d.status}</Badge>;
    }
    return (
        <Table {...props}>
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header.key}>{header.name}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record) => (
                    <TableRow key={record.id?.toString()}>
                        {Object.entries(record)
                            .filter(([key, value]) => key !== "id")
                            .map(([key, value]) => (
                                <TableCell key={key}>{value}</TableCell>
                            ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

