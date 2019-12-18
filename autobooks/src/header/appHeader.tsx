import React from 'react';
import {Component} from "react";
// import styles as styles from './styles';

const style: CSS.Properties{
    container: {
        flexDirection: 'column'
    }
}

export class AppHeader extends Component {
    render() {
        return(
            <div style={}>
                <input type="text" placeholder="insert header here"/>
                <textarea name="message" rows={10} cols={30}>The cat was playing in the garden.</textarea>
            </div>
        )
    }
}

