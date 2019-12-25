import { takeEvery, call, put, take, select} from 'redux-saga/effects'
import {
    addClockInToStore,
    addClockOutToStore,
    ClockInAction,
    ClockInActionTypes,
    ClockOutAction
} from "../actions/base";
import {getNewClockInstances} from "../../App";
import {StoreInterface} from "../../configureStore";

function * clockInSaga(action: ClockInAction) {
    let {clockInTime} = action;
    yield put(addClockInToStore(clockInTime));
    yield call(addStoreToSession)

}

function * clockOutSaga(action: ClockOutAction) {
    let {clockOutTime} = action;
    yield put(addClockOutToStore(clockOutTime))
}

function * addStoreToSession() {
    let clockInstance: StoreInterface = yield select(getNewClockInstances);
    sessionStorage.setItem('clockInTimes', JSON.stringify(clockInstance));
}

export default function* baseMain() {
    yield takeEvery (ClockInActionTypes.clockIn, clockInSaga);
    yield takeEvery(ClockInActionTypes.clockOut, clockOutSaga);
}