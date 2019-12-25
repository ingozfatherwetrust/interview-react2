import React, {Component} from 'react';
import './App.css';
import configureStore, {StoreInterface} from "./configureStore";
import { Provider } from 'react-redux'
import { initialState} from "./configureStore";
import Base from "./base/base";
import {ClockInAction, ClockInActionTypes} from "./base/actions/base";
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
            let clockedInString = new Date(action.clockInTime);
            let newTimeInstance: TimeEntry = {
                clockInTime: clockedInString
            };
            // state.newClockInInstance
            // state['newClockInstances'] = [...state.newClockInstances, newTimeInstance];
            // alert(JSON.stringify(state));
            return {
                newClockInInstances: [...state.newClockInInstances, newTimeInstance]
            };
        case ClockInActionTypes.addClockOutToStore:
            alert(JSON.stringify(state));
            return state;
        default:
            return state
    }
}