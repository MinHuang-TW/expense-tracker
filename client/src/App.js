import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState.jsx';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Login from './components/Login.jsx';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Navigation>
        <Switch>
          <Route path='/register' component={Login} /> 
          <Route path='/user' component={Dashboard} />
          <Route path='logout' />
          
          <Redirect from="/" exact to="/user" />
          <Redirect to="/not-found" />
        </Switch>
      </Navigation>
    </GlobalProvider>
  );
}

export default App;
