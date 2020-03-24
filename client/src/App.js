import React from 'react';
import { GlobalProvider } from './context/GlobalState.jsx';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import Balance from './components/Balance';
import IncomExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#65BCBF',
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
        <CssBaseline />

        <Navbar>
          <div className="container-top">
            <Balance />
            <IncomExpenses />
          </div>

          <div className='container'>
            <TransactionList />
            <AddTransaction />
          </div>
        </Navbar>
        
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
