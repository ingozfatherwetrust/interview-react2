import React from 'react';
import {Component} from "react";
import {Grid} from "@material-ui/core";
import {AppHeader} from "../header/appHeader";
import {AutoBooksTable, TimeEntry} from "../autoBooksTable/autoBooksTable";
import {TimerButton} from "../timer/timerButton";
import {clockIn, ClockInAction, clockOut, ClockOutAction, getSessionData, GetSessionDataAction} from "./actions/base";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

interface TimeEntryState {
    clockedIn: boolean;
}
type props = {};

interface PropsFromState {
    timeEntries: TimeEntry[]
}

interface PropsFromDispatch {
    clockIn: (clockInTime: number) => ClockInAction;
    clockOut: (clockOutTime: number) => ClockOutAction;
    getSessionData: () => GetSessionDataAction;
}

export type ComponentProps = props & PropsFromDispatch & PropsFromState;

class Base extends Component<ComponentProps, TimeEntryState> {

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            clockedIn: false
        };
    }
    private onClockInPressed = () => {
        let newTimeEntry: TimeEntry = {
            clockInTime: Date.now()
        };
        this.setState({
            clockedIn: true
        });
        this.props.clockIn(newTimeEntry.clockInTime);
    };
    private onClockOutPressed = () => {
        const newTimeEntries = this.props.timeEntries;
        const lastItem = newTimeEntries.length - 1;
        newTimeEntries[lastItem].clockOutTime = Date.now();
        this.setState({
            clockedIn: false
        });
        this.props.clockOut((newTimeEntries[lastItem].clockOutTime as number));
    };
    async componentDidMount() {
        let sessionData = sessionStorage.getItem('clockInTimes');
        if(sessionData) {
            await this.props.getSessionData();
        }
        if(this.props.timeEntries.length > 0 && this.props.timeEntries[this.props.timeEntries.length - 1].clockOutTime == undefined) {
            this.setState({
                clockedIn: true
            })
        }
    }

    private setDescription = (description: string) => {
        console.log(description)
    };

    render() {
        return(
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <AppHeader descriptionChanged={this.setDescription} isClockedIn={this.state.clockedIn}/>
                    <AutoBooksTable newClockInInstances={this.props.timeEntries}/>
                    <TimerButton onPressClockIn={this.onClockInPressed} onPressClockOut={this.onClockOutPressed} isClockedIn={this.state.clockedIn}/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: any): PropsFromState => ({
    timeEntries: state.newClockInInstances
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
    clockIn: bindActionCreators(clockIn, dispatch),
    clockOut: bindActionCreators(clockOut, dispatch),
    getSessionData: bindActionCreators(getSessionData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Base)