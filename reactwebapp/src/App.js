import React from 'react';
import logo from './logo.svg';
import './styles/App.css';

import { Home } from './components/home';


function App() {
  console.log('APP')
  //_getRemarks('date',1,0,10)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Home></Home>
    </div>
  );
}

export default App;
