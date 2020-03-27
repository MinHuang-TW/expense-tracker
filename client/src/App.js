import React from 'react';
import { GlobalProvider } from './context/GlobalState.jsx';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import Login from './components/Login.jsx';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Navigation>
        {/* <Dashboard />
        <AddTransaction /> */}
        <Login />
      </Navigation>
    </GlobalProvider>
  );
}

export default App;
