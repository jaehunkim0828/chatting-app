import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './css/App.css';
import Register from './pages/Register';
import Home from './pages/Home';
import Main from './pages/Main';
import Login from './pages/Login';
import Room from './pages/Room';
import GroupRoom from './pages/GroupRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
        <Route path='/room'>
          <Room />
        </Route>
        <Route path='/group-room'>
          <GroupRoom />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
