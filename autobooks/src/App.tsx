import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppHeader} from "./header/appHeader";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader/>
    </div>
  );
}

export default App;
