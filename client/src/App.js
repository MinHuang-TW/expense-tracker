import React from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction.jsx';
import { GlobalProvider } from './context/GlobalState.jsx';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container-top">
        <Balance />
        <IncomExpenses />
      </div>
      <div className='container'>
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
