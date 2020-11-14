import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import MapContainer from '../src/pages/common/components/MapContainer';
import CovidLocation from '../src/pages/common/components/CovidLocation';

import TestSite from '../src/pages/common/components/TestSite';
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';
import AddLocationMap from './pages/common/components/AddLocationMap';
import User from '../src/pages/common/components/User.js';
import About from '../src/pages/common/components/About.js';
import Profile from '../src/pages/common/components/Profile.js';



function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={About} />
        <Route path='/testsite' component={TestSite} />
        <Route path='/signup' component={User} />
        <Route path='/signin' component={WrappedSignIn} />
        <Route path='/Profile' component={Profile} />


      </Switch>




      <Route exact path="/">

      </Route>
    </Router>

  );
}

export default App;
