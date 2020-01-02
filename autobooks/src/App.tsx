import React, {Component} from 'react';
import './App.css';
import {default as configureStore, StoreInterface} from "./configureStore";
import { Provider } from 'react-redux';
import Base from "./base/base";

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
