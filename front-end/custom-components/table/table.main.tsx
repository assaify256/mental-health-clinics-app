import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Header {
    name: string;
    key: string;
}

interface CustomTable {
    headers: Header[];
    data: Record<string, string | number | null | React.ReactNode>[];
}

export const badgify = (
    data: Record<string, string | number | null | React.ReactNode>[],
) => {
    let obj;
    let arr;
    arr = structuredClone(data)
    for (obj of arr) {
        obj.status = <Badge>{obj.status}</Badge>;
    }
    return arr;
};

export default function CustomTable({
    headers = [],
    data,
    ...props
}: CustomTable) {
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
