import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export interface TimeEntry {
    clockInTime: number;
    clockOutTime?: number;
    description?: string;
}


interface TableProps {
    newClockInInstances: TimeEntry[];
    activeDuration?: string;
}

export class AutoBooksTable extends Component <TableProps> {

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Clock In</TableCell>
                        <TableCell>Clock Out</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.checkTimeEntry()}
                </TableBody>
            </Table>
        )
    }


    private checkTimeEntry() {
        if(this.props.newClockInInstances.length !== 0) {
            return this.props.newClockInInstances.map((timeEntry => {
                const clockInDate = new Date(timeEntry.clockInTime);
                let clockInTimeString: string = new Date(clockInDate.getFullYear(), clockInDate.getMonth(), clockInDate.getDate(), clockInDate.getHours(), clockInDate.getMinutes(), clockInDate.getSeconds()).toLocaleString();
                let durationString = undefined;
                let clockOutTimeString = '--';

                if(timeEntry.clockOutTime) {
                    const clockOutDate = new Date(timeEntry.clockOutTime);
                    clockOutTimeString = new Date(clockOutDate.getFullYear(), clockOutDate.getMonth(), clockOutDate.getDate(), clockOutDate.getHours(), clockOutDate.getMinutes(), clockOutDate.getSeconds()).toLocaleString();

                    let {hoursDuration, minutesDuration, secondsDuration} = getDuration(timeEntry.clockOutTime - timeEntry.clockInTime);

                    durationString = `${hoursDuration} hours, ${minutesDuration} minutes, ${secondsDuration} seconds`;
                }
                return (
                    <TableRow>
                        <TableCell>{clockInTimeString}</TableCell>
                        <TableCell>{clockOutTimeString}</TableCell>
                        <TableCell>{durationString || this.props.activeDuration}</TableCell>
                        <TableCell>{timeEntry.description}</TableCell>
                    </TableRow>
                )
            }))
        } else {
            return <></>
        }
    }
}

export function getDuration(totalDuration: number) {
    const hoursDuration: number = Math.floor(totalDuration / (1000 * 60 * 60));
    let minutesDuration = Math.floor((totalDuration - (1000 * 60 * 60 * hoursDuration)) / (1000 * 60));
    let secondsDuration = Math.floor((totalDuration - (1000 * 60 * 60 * hoursDuration) - (1000 * 60 * minutesDuration)) / 1000);

    return {
        hoursDuration,
        minutesDuration,
        secondsDuration
    }
}