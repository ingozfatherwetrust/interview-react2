import React, {Component} from 'react';
import './App.css';
import configureStore from "./configureStore";
import { Provider } from 'react-redux'
import { initialState} from "./configureStore";
import {Base} from "./base/base";


export default class App extends Component {

    render() {
        return (
            <Provider store={configureStore()}>
                <Base/>
            </Provider>
        )
    }
}
export function todos(state = initialState, action: any) {
    switch (action.type) {
        default:
            return state
    }
}