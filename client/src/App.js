import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Login from './components/Login';
import Logout from './components/Logout';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Navigation>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/user' component={Dashboard} />
          <ProtectedRoute path='/report' component={Report} />

          <Redirect from='/' exact to='/user' />
          <Redirect to='/not-found' />
        </Switch>
        <AddTransaction />
      </Navigation>
    </GlobalProvider>
  );
}

export default App;
