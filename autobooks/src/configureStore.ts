import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import sagas from './redux-store/sagas'
import {todos} from "./App";
import {TimeEntry} from "./autoBooksTable/autoBooksTable";

const sagaMiddleware = createSagaMiddleware();

export interface StoreInterface {
    newClockInInstances: TimeEntry[]
}

export function initialState(): StoreInterface {
    return {
        newClockInInstances: []
    }
};

// export default function configureStore() {
    // let initialState = {
    //     newClockInInstances: []
    // };
    // const store = createStore(todos, initialState, compose(applyMiddleware(sagaMiddleware)));
const store = createStore(todos, initialState(), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
// }
