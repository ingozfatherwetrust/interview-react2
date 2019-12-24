import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import sagas from './redux-store/sagas'
import {todos} from "./App";

const sagaMiddleware = createSagaMiddleware();

export function initialState() {
    return {
        newClockInInstances: []
    }
};

export default function configureStore() {
    // let initialState = {
    //     newClockInInstances: []
    // };
    // const store = createStore(todos, initialState, compose(applyMiddleware(sagaMiddleware)));
    const store = createStore(todos, initialState(), applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);
    return store;
}
