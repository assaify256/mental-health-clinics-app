import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    actions?: {
        icon: React.ReactNode;
        className: string;
        name: string;
    }[];
}

export const badgify = (
    data: Record<string, string | number | null | React.ReactNode>[],
) => {
    let obj;
    let arr;
    arr = structuredClone(data);
    for (obj of arr) {
        obj.status = <Badge>{obj.status}</Badge>;
    }
    return arr;
};

export default function CustomTable({
    headers = [],
    data = [],
    actions,
    ...props
}: CustomTable) {
    return (
        <Table {...props}>
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header.key}>{header.name}</TableHead>
                    ))}
                    {actions && <TableHead>Action</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id?.toString()}>
                        {headers.map((header) => (
                            <TableCell key={header.key}>
                                {row[header.key]}
                            </TableCell>
                        ))}
                        {actions && (
                            <TableCell>
                                {actions.map((action) => (
                                    <Button key={action.name} className={action.className}>
                                        {action.icon}
                                    </Button>
                                ))}
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
