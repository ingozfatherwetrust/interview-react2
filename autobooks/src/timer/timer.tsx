import React from 'react';
import {Component} from "react";

interface TimerState {
    test: number
}

export class Timer extends Component<null, TimerState> {
    // constructor () {
    //     this.state = {
    //         test: 1
    //     }
    // }
    render() {
        return <h1>Hello world</h1>;
    }
}