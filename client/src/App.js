import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import MapContainer from '../src/pages/common/components/MapContainer';
import CovidLocation from '../src/pages/common/components/CovidLocation';

import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';
import AddLocationMap from './pages/common/components/AddLocationMap';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/testsite' component={MapContainer} />
      <Route path='/covid+locations' component={CovidLocation} />
      <Route path='/signup' component={WrappedSignUp} />
      <Route path='/signin' component={WrappedSignIn} />
      <Route exact path="/">
        <h1>Welcome to the about</h1>
      </Route>
    </Router>
  );
}

export default App;
