import React from 'react';
import {Component} from "react";
// import styles as styles from './styles';
import './styles.css';
import {Grid} from "@material-ui/core";

export class AppHeader extends Component {
    render() {
        return(
            <div>
                <Grid container xs={12} className={'spacedRow'}>
                    <input type="text" placeholder="insert header here"/>
                </Grid>
                <Grid container xs={12} className={'spacedRow'}>
                    <textarea name="message" placeholder="Insert timer description here" rows={10} cols={30}/>
                </Grid>
            </div>
        )
    }
}

