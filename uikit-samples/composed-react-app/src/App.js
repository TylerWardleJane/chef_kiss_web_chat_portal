import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Chat from './Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat/user/:userId/staff/:staffId">
            <Chat />
          </Route>
          <Route path="/">
            Chat is running
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
