import { createMuiTheme } from "@material-ui/core";

export const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#65BCBF',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fff',
      // contrastText: '#fff'
    },
  },
});

export const datePickerExpense = createMuiTheme({
  palette: {
    primary: {
      main: '#f8777d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      // contrastText: '#fff'
    },
  },
});


export const whiteTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255, 255, 255, 1)',
      contrastText: '#65BCBF'
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.7)',
      contrastText: '#fff'
    },
  },
});