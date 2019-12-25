import React from 'react';
import {Component} from "react";
import {Grid} from "@material-ui/core";
import {AppHeader} from "../header/appHeader";
import {AutoBooksTable, TimeEntry} from "../autoBooksTable/autoBooksTable";
import {TimerButton} from "../timer/timerButton";
import {clockIn, ClockInAction, clockOut, ClockOutAction} from "./actions/base";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

interface TimeEntryState {
    timeEntries: TimeEntry[];
    clockedIn: boolean;
}
type props = {};

interface PropsFromDispatch {
    clockIn: (clockInTime: number) => ClockInAction;
    clockOut: (clockOutTime: number) => ClockOutAction;
}

export type ComponentProps = props & PropsFromDispatch;

class Base extends Component<ComponentProps, TimeEntryState> {
    state: TimeEntryState = {
        timeEntries: [],
        clockedIn: false
    };
    private onClockInPressed = async () => {
        let newTimeEntry: TimeEntry = {
            clockInTime: Date.now()
        };
        await this.setState(prevState => ({
            timeEntries: [...prevState.timeEntries, newTimeEntry],
            clockedIn: true
        }));
        this.props.clockIn(newTimeEntry.clockInTime);
        sessionStorage.setItem('clockInTimes', JSON.stringify(this.state));
    };
    private onClockOutPressed =  async () => {
        const newTimeEntries = this.state.timeEntries;
        const lastItem = newTimeEntries.length - 1;
        newTimeEntries[lastItem].clockOutTime = Date.now();
        await this.setState({
            timeEntries: newTimeEntries,
            clockedIn: false
        });
        this.props.clockOut((newTimeEntries[lastItem].clockOutTime as number));
        sessionStorage.setItem('clockInTimes', JSON.stringify(this.state));
    };
    componentDidMount() {
        let sessionData = sessionStorage.getItem('clockInTimes');
        if(sessionData) {
            let sessionDataJSON: TimeEntryState = JSON.parse(sessionData);
            this.setState({
                timeEntries: sessionDataJSON.timeEntries,
                clockedIn: sessionDataJSON.clockedIn
            });
        }
    }

    render() {
        return(
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <AppHeader/>
                    <AutoBooksTable newClockInInstances={this.state.timeEntries}/>
                    <TimerButton onPressClockIn={this.onClockInPressed} onPressClockOut={this.onClockOutPressed} isClockedIn={this.state.clockedIn}/>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
    clockIn: bindActionCreators(clockIn, dispatch),
    clockOut: bindActionCreators(clockOut, dispatch)
});

export default connect(null, mapDispatchToProps)(Base)