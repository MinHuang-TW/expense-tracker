import { createMuiTheme } from "@material-ui/core";

export const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#65BCBF',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f8777d',
      contrastText: '#fff'
    },
  },
});

export const datePickerExpense = createMuiTheme({
  palette: {
    primary: {
      main: '#f8777d',
      contrastText: '#fff',
    },
  },
});