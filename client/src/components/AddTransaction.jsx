import React, { useState, useContext, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberValid, numberCalc } from '../utils/format';
import { datePickerExpense, defaultMaterialTheme } from '../utils/colorTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, InputAdornment, Fab, Switch } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import 'date-fns';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    opacity: 0.8,
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  textColor: {
    color: '#232C2D',
    opacity: 0.8,
  },
  input: {
    fontSize: '36px',
  },
  inputPlus: {
    color: theme.palette.primary.main,
  },
  inputMinus: {
    color: '#f8777d',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    boxShadow: 'none',
  },
}));

const dateFormat = 'd MMM, yyyy';
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, dateFormat, { locale: this.locale });
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const TransactionSwitch = withStyles((theme) => ({
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
    boxShadow: 'none',
  },
  checked: {},
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Switch);

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState(''),
        [errorText, setErrorText] = useState(false);
  const [amount, setAmount] = useState(null),
        [errorAmount, setErrorAmount] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [minus, setMinus] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);

  const classes = useStyles();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
    setAmount(null);
    setText('');
    setDate(new Date());
    setMinus(true);
    setDisableBtn(true);
  }, []);

  const handleMinus = useCallback(() => {
    setMinus(!minus);
  }, [minus]);

  const handleAmount = useCallback((e) => {
    if (numberValid(e.target.value)) {
      setAmount(e.target.value);
      setErrorAmount(false);
      !text 
        ? setDisableBtn(true)
        : errorText
        ? setDisableBtn(true)
        : setDisableBtn(false);
    } else {
      setErrorAmount(true);
      setDisableBtn(true);
    }
  }, [text, errorText]);

  const handleText = useCallback((e) => {
    if (e.target.value) {
      setText(e.target.value);
      setErrorText(false);
      !amount
        ? setDisableBtn(true)
        : errorAmount
        ? setDisableBtn(true)
        : setDisableBtn(false);
    } else {
      setErrorText(true);
      setDisableBtn(true);
    }
  }, [amount, errorAmount]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: minus ? -numberCalc(amount) : numberCalc(amount),
      date,
    };
    addTransaction(newTransaction);
    handleClose();
  };

  return (
    <>
      <Fab
        color='primary'
        aria-label='add'
        disableRipple
        className={`${classes.fab} no-outline`}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <ThemeProvider theme={minus ? datePickerExpense : defaultMaterialTheme}>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' className={classes.title}>
                New {minus ? 'Expense' : 'Income'}
              </Typography>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <form onSubmit={onSubmit} className='new-form' noValidate autoComplete='off'>
            <div className='input-amount'>
              <TextField
                id='standard-full-width'
                label='Amount'
                required
                autoFocus
                InputProps={{
                  className: `${classes.input} ${
                    minus ? classes.inputMinus : classes.inputPlus
                  }`,
                  startAdornment: (
                    <InputAdornment position='start' style={{ margin: 0 }}>
                      {minus ? <RemoveIcon /> : <AddIcon />}
                    </InputAdornment>
                  ),
                }}
                error={errorAmount}
                helperText={
                  errorAmount
                    ? 'Please enter a valid number'
                    : 'Toggle Income / Expense'
                }
                onChange={handleAmount}
              />

              <TransactionSwitch
                checked={minus}
                tabIndex='-1'
                onChange={handleMinus}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>

            <TextField
              id='standard-full-width'
              label='Description'
              fullWidth
              required
              error={errorText}
              InputLabelProps={{ shrink: true }}
              InputProps={{ className: classes.textColor }}
              helperText={errorText && 'Please describe the transaction'}
              onChange={handleText}
            />

            <MuiPickersUtilsProvider utils={LocalizedUtils}>
              <KeyboardDatePicker
                id='date-picker-dialog'
                label='Date'
                value={date}
                format={dateFormat}
                onChange={(date) => setDate(date)}
                InputProps={{ className: classes.textColor }}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
                fullWidth
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
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AddTransaction;
