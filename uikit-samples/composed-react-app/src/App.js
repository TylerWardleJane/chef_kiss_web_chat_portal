import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './Login';
import Chat from './Chat';

function App() {
  const [config, setconfig] = useState({});
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat/user/:userId/nickname/:nickname/staff/:staffId">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
