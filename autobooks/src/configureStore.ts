import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import sagas from './redux-store/sagas';
import {TimeEntry} from "./autoBooksTable/autoBooksTable";
import {reducer} from "./redux-store/reducer";

const sagaMiddleware = createSagaMiddleware();

export interface StoreInterface {
    newClockInInstances: TimeEntry[]
}

export function initialState(): StoreInterface {
    return {
        newClockInInstances: []
    }
};

const configureStore = () => {
    // let initialState = {
    //     newClockInInstances: []
    // };
    // const store = createStore(reducer, initialState, compose(applyMiddleware(sagaMiddleware)));
    const store = createStore(reducer, initialState(), applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(sagas);

    return store;
};

export default configureStore;

