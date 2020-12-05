import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';
import About from '../src/pages/common/components/About.js';
import Profile from '../src/pages/common/components/Profile.js';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={About} />
        <Route path='/signup' component={WrappedSignUp} />
        <Route path='/signin' component={WrappedSignIn} />
        <Route path='/Profile/:username' component={Profile} />
      </Switch>
      <Route exact path="/">

      </Route>
    </Router>

  );
}

export default App;
