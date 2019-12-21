import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppHeader} from "./header/appHeader";
import {Grid} from "@material-ui/core";
import {findAllByDisplayValue} from "@testing-library/dom";
import {TimerButton} from "./timer/timerButton";

const App: React.FC = () => {
  return (
      <div>
          <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
          >
              {/*<h1>Hello World</h1>*/}
              <AppHeader/>
              <TimerButton onPressClockIn={onClockInPressed} onPressClockOut={onClockInPressed} isClockedIn={false}/>
          </Grid>
      </div>
  );
};

const onClockInPressed = () => {
    console.log('hello')
}

export default App;
