import React from 'react';
import {Component} from "react";
import {Button, Grid} from "@material-ui/core";


interface TestProps {
    onPressClockIn: () => void;
    onPressClockOut: () => void;
    isClockedIn: boolean
}

export class TimerButton extends Component<TestProps> {

    render() {
        return (
            <div>
                <Grid container xs={12} className={'spacedRow'}>
                    <Button variant="contained" color="primary" disabled={this.props.isClockedIn} onClick={this.props.onPressClockIn}>
                        Clock in
                    </Button>
                    <Button variant="contained" color="secondary" disabled={!this.props.isClockedIn} onClick={this.props.onPressClockOut}>
                        Clock out
                    </Button>
                </Grid>
            </div>
        )
    }
}