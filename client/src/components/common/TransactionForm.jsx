import React, { useState, useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberValid, numberCalc } from '../../utils/format';
import { datePickerExpense, defaultMaterialTheme } from '../../utils/colorTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, InputAdornment, Switch } from '@material-ui/core';
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
  // fab: {
  //   position: 'fixed',
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  //   boxShadow: 'none',
  // },
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

const TransactionForm = ({ open, setOpen, action, transaction }) => {
  const { addTransaction, updateTransaction } = useContext(GlobalContext);
  const initialText = transaction ? transaction.text : '',
        initialAmount = transaction ? Math.abs(transaction.amount) : null,
        initialDate = transaction ? transaction.date : new Date(),
        initialMinus = transaction && transaction.amount > 0 ? false : true;

  const [text, setText] = useState(initialText),
        [errorText, setErrorText] = useState(false);
  const [amount, setAmount] = useState(initialAmount),
        [errorAmount, setErrorAmount] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [minus, setMinus] = useState(initialMinus);
  const [disableBtn, setDisableBtn] = useState(true);

  const classes = useStyles();

  const handleClose = useCallback(() => {
    setOpen(false);
    setText(initialText);
    setErrorText(false);
    setAmount(initialAmount);
    setErrorAmount(false);
    setDate(initialDate);
    setDisableBtn(true);
    setMinus(initialMinus);
    // eslint-disable-next-line
  }, []);

  const handleMinus = useCallback(() => {
    setMinus(!minus);
  }, [minus]);

  const itemValid = (item, errorItem) => {
    if (!item) setDisableBtn(true);
    else errorItem ? setDisableBtn(true) : setDisableBtn(false);
  };

  const handleAmount = useCallback((e) => {
    setAmount(e.target.value);
    if (numberValid(e.target.value)) {
      setErrorAmount(false);
      itemValid(text, errorText);
    } else {
      setErrorAmount(true);
      setDisableBtn(true);
    }
  }, [text, errorText]);

  const handleText = useCallback((e) => {
    setText(e.target.value);
    if (e.target.value) {
      setErrorText(false);
      itemValid(amount, errorAmount);
    } else {
      setErrorText(true);
      setDisableBtn(true);
    }
  }, [amount, errorAmount]);

  const handleDate = useCallback((date) => {
    setDate(date);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: minus ? -numberCalc(amount) : numberCalc(amount),
      date,
    };
    if (action === 'new') addTransaction(newTransaction);
    if (action === 'edit') updateTransaction(transaction._id, newTransaction);
    handleClose();
  };

  return (
    <>
      <ThemeProvider theme={minus ? datePickerExpense : defaultMaterialTheme}>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' className={classes.title}>
                {action} {minus ? 'Expense' : 'Income'}
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <form
            onSubmit={onSubmit}
            className='new-form'
            noValidate
            autoComplete='off'
          >
            <div className='input-amount'>
              <TextField
                id='input-amount'
                label='Amount'
                required
                autoFocus
                value={transaction && transaction.amount && amount}
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
              id='input-description'
              label='Description'
              fullWidth
              required
              value={transaction && transaction.text && text}
              error={errorText}
              InputLabelProps={{ shrink: true }}
              InputProps={{ className: classes.textColor }}
              helperText={errorText && 'Please describe the transaction'}
              onChange={handleText}
            />

            <MuiPickersUtilsProvider utils={LocalizedUtils}>
              <KeyboardDatePicker
                id='input-date'
                label='Date'
                value={date}
                format={dateFormat}
                onChange={handleDate}
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

export default TransactionForm;