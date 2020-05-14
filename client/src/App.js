import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

const App = () => (
  <GlobalProvider>
    <Navigation>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />

        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <ProtectedRoute path='/transactions' component={Transactions} />
        <ProtectedRoute path='/statistics' component={Statistics} />
        <ProtectedRoute path='/profile' component={Profile} />

        <Redirect from='/' exact to='/dashboard' />
        <Redirect to='/not-found' />
      </Switch>
    </Navigation>
  </GlobalProvider>
);

export default App;