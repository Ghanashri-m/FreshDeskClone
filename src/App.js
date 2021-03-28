import React from 'react';
import {Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/';
import Tickets from './components/Tickets';
import Contacts from './components/Contacts';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
        <Route exact path='/' component={Home} />
        <Route path='/tickets' component={Tickets} />
        <Route path='/contacts' component={Contacts} />
    </>
  );
}

export default App;
