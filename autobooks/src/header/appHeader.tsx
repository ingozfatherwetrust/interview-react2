import React from 'react';
import {Component} from "react";
import './styles.css';
import {Grid} from "@material-ui/core";

interface AppHeaderProps {
    descriptionChanged: (changedText: string) => void;
    isClockedIn: boolean;
}
interface AppHeaderState {
    descriptionText: string
}

export class AppHeader extends Component<AppHeaderProps, AppHeaderState> {

    state = {
        descriptionText: ''
    };

    private headerTextChanged = (headerText: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            descriptionText: headerText.target.value
        });
        this.props.descriptionChanged(this.state.descriptionText)
    };

    render() {
        return(
            <div>
                {/*<Grid container xs={12} className={'spacedRow'}>*/}
                    <h1>Time Sheet</h1>
                    <input type="text" onChange={this.headerTextChanged} placeholder='task description' disabled={this.props.isClockedIn}/>
                {/*</Grid>*/}
            </div>
        )
    }
}

