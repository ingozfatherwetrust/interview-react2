import React from 'react';
import {Component} from "react";
import './styles.css';
import {Grid} from "@material-ui/core";

export class AppHeader extends Component {

    render() {
        return(
            <div>
                <Grid container xs={12} className={'spacedRow'}>
                    <h1>Time Sheet</h1>
                </Grid>
            </div>
        )
    }
}

