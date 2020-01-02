import {all} from 'redux-saga/effects';
import baseMain from "../base/sagas/base";

export default function * main() {
    const sagas = [
        baseMain()
    ];
    yield all(sagas);
}