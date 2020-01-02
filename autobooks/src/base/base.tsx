import React from 'react';
import {Component} from "react";
import {Grid} from "@material-ui/core";
import {AppHeader} from "../header/appHeader";
import {AutoBooksTable, getDuration, TimeEntry} from "../autoBooksTable/autoBooksTable";
import {TimerButton} from "../timer/timerButton";
import {clockIn, ClockInAction, clockOut, ClockOutAction, getSessionData, GetSessionDataAction} from "./actions/base";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

interface TimeEntryState {
    clockedIn: boolean;
    description: string;
    activeDuration?: string;
    timer?: any
}
type props = {};

interface PropsFromState {
    timeEntries: TimeEntry[]
}

interface PropsFromDispatch {
    clockIn: (clockInTime: number, description: string) => ClockInAction;
    clockOut: (clockOutTime: number) => ClockOutAction;
    getSessionData: () => GetSessionDataAction;
}

export type ComponentProps = props & PropsFromDispatch & PropsFromState;

class Base extends Component<ComponentProps, TimeEntryState> {

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            clockedIn: false,
            description: '',
            timer: undefined
        };
    }
    private onClockInPressed = () => {
        let newTimeEntry: TimeEntry = {
            clockInTime: Date.now()
        };
        this.setState({
            clockedIn: true
        });
        this.props.clockIn(newTimeEntry.clockInTime, this.state.description);
        this.setState({timer: this.startTimer()});
    };

    private startTimer = () => {
        return setInterval(() => {
            let currentEpoch = Date.now();
            let {hoursDuration, minutesDuration, secondsDuration} = getDuration(currentEpoch - this.props.timeEntries[this.props.timeEntries.length - 1].clockInTime);
            this.setState({
                activeDuration: `${hoursDuration} hours, ${minutesDuration} minutes, ${secondsDuration} seconds`
            });
        }, 1000);
    }


    private onClockOutPressed = () => {
        const newTimeEntries = this.props.timeEntries;
        const lastItem = newTimeEntries.length - 1;
        newTimeEntries[lastItem].clockOutTime = Date.now();
        this.setState({
            clockedIn: false,
            activeDuration: undefined
        });
        clearInterval(this.state.timer);
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
            });
            this.startTimer();
        }
    }

    private setDescription = async (description: string) => {
        await this.setState({description});
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
                    <AutoBooksTable newClockInInstances={this.props.timeEntries} activeDuration={this.state.activeDuration}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Base);