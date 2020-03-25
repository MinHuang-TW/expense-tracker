import React from 'react';
import { GlobalProvider } from './context/GlobalState.jsx';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultMaterialTheme } from './utils/colorTheme';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider theme={defaultMaterialTheme}>
        <CssBaseline />
        <Navbar />
        <main>
          <Dashboard />
          <AddTransaction />
          {/* </Navbar> */}
        </main>
        
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
