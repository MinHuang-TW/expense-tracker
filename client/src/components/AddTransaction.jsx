import React, { useState, useContext, Fragment } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberValid, numberCalc } from '../utils/format';
import { datePickerExpense, defaultMaterialTheme } from '../utils/colorTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, InputAdornment, Fab, Switch } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    opacity: 0.8,
  },
  input : {
    fontSize: '36px',
  },
  inputPlus: {
    color: theme.palette.primary.main,
  },
  inputMinus: {
    color: theme.palette.secondary.main,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    boxShadow: 'none',
  },
}));

const Transition = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionSwitch = withStyles(theme => ({
  root: {
    marginRight: -12,
  },
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  thumb: {
    boxShadow: 'none'
  },
  checked: {},
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Switch);

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [errorText, setErrorText] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);

  const [minus, setMinus] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
    setDate(new Date());
    setMinus(true);
    setDisableBtn(true);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: minus ? -numberCalc(amount) : numberCalc(amount),
      date
    };
    addTransaction(newTransaction);

    setAmount(null);
    setText('');
    setDate(new Date());

    setOpen(false);
  };

  return (
    <Fragment>
      <Fab
        color='primary' aria-label='add' disableRipple
        className={`${classes.fab} no-outline`}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color={minus ? 'secondary' : 'primary'}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              New {minus ? 'Expense' : 'Income'}
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <ThemeProvider theme={minus ? datePickerExpense : defaultMaterialTheme}>
          <form onSubmit={onSubmit} className="new-form" noValidate autoComplete="off">
            <div className='input-amount'>
              <TextField
                id="standard-full-width"
                label="Amount" required autoFocus
                InputProps={{
                  className: `${classes.input} ${minus ? classes.inputMinus : classes.inputPlus}`,
                  startAdornment: (
                    <InputAdornment position="start" style={{ margin: 0 }}>
                      {minus ? <RemoveIcon /> : <AddIcon />}
                    </InputAdornment>)
                  }}
                error={errorAmount}
                helperText={errorAmount 
                  ? "Please enter a valid number" : "Toggle Income / Expense"}
                onChange={e => {
                  setAmount(e.target.value);
                  setErrorAmount(numberValid(e.target.value) ? false : true);
                  numberValid(e.target.value) && text 
                    ? setDisableBtn(false) : setDisableBtn(true);
                }} 
              />

              <TransactionSwitch
                checked={minus}
                onChange={() => setMinus(!minus)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>

            <TextField
              id="standard-full-width"
              label="Description" 
              fullWidth required
              error={errorText}
              InputLabelProps={{ shrink: true }}
              helperText={errorText && "Please describe the transaction"}
              onChange={e => {
                setText(e.target.value);
                setErrorText(!e.target.value ? true : false);
                e.target.value && !errorText 
                  ? setDisableBtn(false) : setDisableBtn(true);
              }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog" label="Date"
                value={date} format="dd / MM / yyyy"
                fullWidth
                onChange={date => setDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <button 
              className={`btn ${minus ? 'minus-bg' : 'plus-bg'}`}
              style={{ marginTop: '50px' }}
              disabled={disableBtn ? true : false}
            >
              SAVE
            </button>
          </form>
        </ThemeProvider>
      </Dialog>
    </Fragment>
  );
};

export default AddTransaction;
