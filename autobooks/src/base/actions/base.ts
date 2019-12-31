import {Action} from "redux";
import {TimeEntry} from "../../autoBooksTable/autoBooksTable";

export enum ClockInActionTypes {
    clockIn = 'clockIn',
    clockOut = 'clockOut',
    addClockInToStore = 'addClockInToStore',
    addClockOutToStore = 'addClockOutToStore',
    getSessionData = 'getSessionData',
    putSessionInStore = 'putSessionInStore'
}

export interface ClockInAction extends Action{
    type: ClockInActionTypes.clockIn,
    clockInTime: number,
    description: string
}

export interface ClockOutAction extends Action{
    type: ClockInActionTypes.clockOut,
    clockOutTime: number
}

export interface AddClockInToStoreAction extends Action{
    type: ClockInActionTypes.addClockInToStore,
    clockInTime: number
    description: string
}

export interface AddClockOutToStoreAction extends Action{
    type: ClockInActionTypes.addClockOutToStore,
    clockOutTime: number
}

export interface GetSessionDataAction extends Action {
    type: ClockInActionTypes.getSessionData
}

export interface PutSessionInStoreAction extends Action {
    type: ClockInActionTypes.putSessionInStore,
    timeEntries: TimeEntry[]
}

export function clockIn(clockInTime: number, description: string): ClockInAction {
    return {
        type: ClockInActionTypes.clockIn,
        clockInTime,
        description
    }
}

export function clockOut(clockOutTime: number): ClockOutAction {
    return {
        type: ClockInActionTypes.clockOut,
        clockOutTime
    }
}

export function addClockInToStore(clockInTime: number, description: string): AddClockInToStoreAction {
    return {
        type: ClockInActionTypes.addClockInToStore,
        clockInTime,
        description
    }
}

export function addClockOutToStore(clockOutTime: number): AddClockOutToStoreAction {
    return {
        type: ClockInActionTypes.addClockOutToStore,
        clockOutTime
    }
}

export function getSessionData(): GetSessionDataAction {
    return {
        type: ClockInActionTypes.getSessionData
    }
}

export function putSessionInStore(timeEntries: TimeEntry[]): PutSessionInStoreAction {
    return {
        type: ClockInActionTypes.putSessionInStore,
        timeEntries
    }
}