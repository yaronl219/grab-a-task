import React from 'react';
import logo from './logo.svg';
import {Home} from './pages/Home';
import './assets/styles/global.scss'
import { Route, Switch } from 'react-router';
import { CardDetails } from './cmps/CardCmps/CardDetails';
import { Board } from './pages/Board';

function App() {

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Switch>
        <Route path="/board/:id/:cardId?" component={Board} exact />
          <Route component={ Board } path='/' />
        </Switch>
      
    </div>
  );
}

export default App;
