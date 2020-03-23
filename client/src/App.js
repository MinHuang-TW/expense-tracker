import React from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction.jsx';
import { GlobalProvider } from './context/GlobalState.jsx';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core";
import cyan from '@material-ui/core/colors/cyan'
import './App.css';

function App() {
  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: cyan[500],
        contrastText: '#fff'
      },
      secondary: {
        main: '#607d8b',
        contrastText: '#fff'
      },
    },
  });
  
  return (
    <GlobalProvider>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Header />
        <div className="container-top">
          <Balance />
          <IncomExpenses />
        </div>
        <div className='container'>
          <TransactionList />
          <AddTransaction />
        </div>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
