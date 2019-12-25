import {Action} from "redux";

export enum ClockInActionTypes {
    clockIn = 'clockIn',
    clockOut = 'clockOut',
    addClockInToStore = 'addClockInToStore',
    addClockOutToStore = 'addClockOutToStore'
}

export interface ClockInAction extends Action{
    type: ClockInActionTypes.clockIn,
    clockInTime: number
}

export interface ClockOutAction extends Action{
    type: ClockInActionTypes.clockOut,
    clockOutTime: number
}

export interface AddClockInToStoreAction extends Action{
    type: ClockInActionTypes.addClockInToStore,
    clockInTime: number
}

export interface AddClockOutToStoreAction extends Action{
    type: ClockInActionTypes.addClockOutToStore,
    clockOutTime: number
}

export function clockIn(clockInTime: number): ClockInAction {
    return {
        type: ClockInActionTypes.clockIn,
        clockInTime
    }
}

export function clockOut(clockOutTime: number): ClockOutAction {
    return {
        type: ClockInActionTypes.clockOut,
        clockOutTime
    }
}

export function addClockInToStore(clockInTime: number): AddClockInToStoreAction {
    return {
        type: ClockInActionTypes.addClockInToStore,
        clockInTime
    }
}

export function addClockOutToStore(clockOutTime: number): AddClockOutToStoreAction {
    return {
        type: ClockInActionTypes.addClockOutToStore,
        clockOutTime
    }
}