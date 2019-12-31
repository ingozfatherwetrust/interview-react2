import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export interface TimeEntry {
    clockInTime: number;
    clockOutTime?: number;
    description?: string;
}



interface TableProps {
    newClockInInstances: TimeEntry[];
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

    private getDuration(totalDuration: number) {
        const hoursDuration: number = Math.floor(totalDuration / (1000 * 60 * 60));
        let minutesDuration;
        let secondsDuration;
        if(hoursDuration > 0) {
            minutesDuration = Math.floor((totalDuration % hoursDuration) / (1000 * 60));
            if(minutesDuration > 0) {
                secondsDuration = Math.round((totalDuration % hoursDuration % minutesDuration) / (1000));
            } else {
                secondsDuration = Math.round((totalDuration % hoursDuration) / 1000);
            }
        } else {
            minutesDuration = Math.floor(totalDuration / (1000 * 60));
            if(minutesDuration > 0) {
                secondsDuration = Math.round((totalDuration % minutesDuration) / (1000));
            } else {
                secondsDuration = Math.round(totalDuration / 1000);
            }
        }
        return {
            hoursDuration,
            minutesDuration,
            secondsDuration
        }
    }
    private checkTimeEntry() {
        if(this.props.newClockInInstances.length !== 0) {
            return this.props.newClockInInstances.map((timeEntry => {
                const clockInDate = new Date(timeEntry.clockInTime);
                const clockInTimeString: string =
                    `${clockInDate.getMonth() + 1}-${clockInDate.getDate()}-${clockInDate.getFullYear()} ${clockInDate.getHours()}:${clockInDate.getMinutes()}`;
                let durationString = '--';
                let clockOutTimeString = '--';
                if(timeEntry.clockOutTime) {
                    const clockOutDate = new Date(timeEntry.clockOutTime);
                    clockOutTimeString =
                        `${clockOutDate.getMonth() + 1}-${clockOutDate.getDate()}-${clockOutDate.getFullYear()} ${clockOutDate.getHours()}:${clockOutDate.getMinutes()}`;
                    // const totalDuration: number = timeEntry.clockOutTime - timeEntry.clockInTime;
                    let {hoursDuration, minutesDuration, secondsDuration} = this.getDuration(timeEntry.clockOutTime - timeEntry.clockInTime);
                    // const hoursDuration: number = Math.floor(totalDuration / (1000 * 60 * 60));
                    // debugger;
                    // alert((totalDuration % hoursDuration));

                    // const minutesDuration = hoursDuration === 0 ? Math.floor(totalDuration / (1000 * 60)): Math.floor((totalDuration % hoursDuration) / (1000 * 60));
                    // const secondsDuration = Math.floor(totalDuration / (1000));
                    durationString = `${hoursDuration} hours, ${minutesDuration} minutes, ${secondsDuration} seconds`;
                }



                return (
                    <TableRow>
                        <TableCell>{clockInTimeString}</TableCell>
                        <TableCell>{clockOutTimeString}</TableCell>
                        <TableCell>{durationString}</TableCell>
                        <TableCell>{timeEntry.description}</TableCell>
                    </TableRow>
                )
            }))
        } else {
            return <></>
        }
    }
}