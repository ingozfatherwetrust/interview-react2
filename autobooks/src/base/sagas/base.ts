import { takeEvery, call, put, take, select} from 'redux-saga/effects'
import {
    addClockInToStore,
    addClockOutToStore,
    ClockInAction,
    ClockInActionTypes,
    ClockOutAction,
    putSessionInStore
} from "../actions/base";
import {getNewClockInstances} from "../../App";
import {StoreInterface} from "../../configureStore";

function * clockInSaga(action: ClockInAction) {
    let {clockInTime, description} = action;
    yield put(addClockInToStore(clockInTime, description));
    yield call(addStoreToSession);

}

function * clockOutSaga(action: ClockOutAction) {
    let {clockOutTime} = action;
    yield put(addClockOutToStore(clockOutTime));
    yield call(addStoreToSession);
}

function * addStoreToSession() {
    let clockInstance: StoreInterface = yield select(getNewClockInstances);
    sessionStorage.setItem('clockInTimes', JSON.stringify(clockInstance));
}

function * getSessionSaga() {
    let sessionData = yield sessionStorage.getItem('clockInTimes');
    yield put(putSessionInStore(JSON.parse(sessionData)))
}

export default function* baseMain() {
    yield takeEvery (ClockInActionTypes.clockIn, clockInSaga);
    yield takeEvery(ClockInActionTypes.clockOut, clockOutSaga);
    yield takeEvery(ClockInActionTypes.getSessionData, getSessionSaga);
}