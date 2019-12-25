import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export interface TimeEntry {
    clockInTime: any;
    clockOutTime?: number | string;
}

interface TableProps {
    newClockInInstances: TimeEntry[];
}

export class AutoBooksTable extends Component <TableProps> {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Clock Out</TableCell>
                </TableHead>
                <TableBody>
                    {this.props.newClockInInstances.map((timeEntry => {
                        return (
                            <TableRow>
                                <TableCell>{timeEntry.clockInTime}</TableCell>
                                <TableCell>{timeEntry.clockOutTime}</TableCell>
                            </TableRow>
                        )
                    }))}
                </TableBody>
            </Table>
        )
    }
}