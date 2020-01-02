import {initialState, StoreInterface} from "../configureStore";
import {ClockInActionTypes} from "../base/actions/base";
import {TimeEntry} from "../autoBooksTable/autoBooksTable";

export function reducer(state: StoreInterface = initialState(), action: any) {
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