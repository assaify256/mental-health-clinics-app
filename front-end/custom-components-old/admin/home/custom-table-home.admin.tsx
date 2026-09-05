import { HomeTable } from "@/data/table.admin";
import { Card, CardContent } from "../../../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";



interface TablePropsInterface {
    data: HomeTable[];
    className: string;
}

export default function CustomTable({
    data,
    className,
}: TablePropsInterface) {
    return (
        <Card className={`${className}`}>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client Name</TableHead>
                            <TableHead>Professional Name</TableHead>
                            <TableHead>Date Time</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>No Records Found</TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.client}</TableCell>
                                    <TableCell>{row.professional}</TableCell>
                                    <TableCell>{row.dateTime}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
