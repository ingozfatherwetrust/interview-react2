import React, {Component} from 'react';
import './App.css';
import {default as configureStore, StoreInterface} from "./configureStore";
import { Provider } from 'react-redux'
import { initialState} from "./configureStore";
import Base from "./base/base";
import {
    ClockInActionTypes
} from "./base/actions/base";
import {TimeEntry} from "./autoBooksTable/autoBooksTable";


export default class App extends Component {

    render() {
        return (
            <Provider store={configureStore()}>
                <Base/>
            </Provider>
        )
    }
}

export const getNewClockInstances = (state: StoreInterface): StoreInterface => {
    return state;

};

export function todos(state: StoreInterface = initialState(), action: any) {
    switch (action.type) {
        case ClockInActionTypes.addClockInToStore:
            console.log(action);
            let clockedInString = action.clockInTime;
            let newTimeInstance: TimeEntry = {
                clockInTime: clockedInString,
                description: action.description
            };
            state.newClockInInstances = state.newClockInInstances.concat(newTimeInstance);
            return {
                newClockInInstances: state.newClockInInstances
            };
        case ClockInActionTypes.addClockOutToStore:
            let lastClockInInstance = state.newClockInInstances.length - 1;
            state.newClockInInstances[lastClockInInstance] = {
                clockInTime: state.newClockInInstances[lastClockInInstance].clockInTime,
                clockOutTime: action.clockOutTime,
                description: state.newClockInInstances[lastClockInInstance].description
            };
            return state;
        case ClockInActionTypes.putSessionInStore:
            return action.timeEntries;
        default:
            return state
    }
}