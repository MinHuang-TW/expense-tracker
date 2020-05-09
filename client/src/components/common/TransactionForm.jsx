import React, { useState, useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { InputAmount, InputText, InputDate } from '../common/Input';
import { numberValid, numberCalc, numberEuro } from '../../utils/format';
import { datePickerExpense, defaultMaterialTheme } from '../../utils/colorTheme';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import 'date-fns';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const TopBar = ({ action, minus, handleClose }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          {action} {minus ? 'Expense' : 'Income'}
        </Typography>
        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const TransactionForm = ({ open, setOpen, action, transaction }) => {
  const { addTransaction, updateTransaction } = useContext(GlobalContext);
  const initialText = transaction ? transaction.text : '',
        initialAmount = transaction ? numberEuro(Math.abs(transaction.amount)).toString() : null,
        initialDate = transaction ? transaction.date : moment(),
        initialMinus = transaction && transaction.amount > 0 ? false : true;
  const [text, setText] = useState(initialText),
        [errorText, setErrorText] = useState(false);
  const [amount, setAmount] = useState(initialAmount),
        [errorAmount, setErrorAmount] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [minus, setMinus] = useState(initialMinus);
  const [disableBtn, setDisableBtn] = useState(true);

  const reset = () => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
    setDisableBtn(true);
  };

  const handleClose = useCallback(() => {
    reset();
    setText(initialText);
    setAmount(initialAmount);
    setDate(initialDate);
    setMinus(initialMinus);
    // eslint-disable-next-line
  }, [initialText, initialAmount, initialDate, initialMinus]);

  const handleSave = useCallback(() => {
    reset();
    setText(text);
    setAmount(amount);
    setDate(date);
    setMinus(minus);
    // eslint-disable-next-line
  }, [text, minus, amount, date]);

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

  const handleMinus = useCallback(() => {
    setMinus(!minus);
    itemValid(text, errorText);
    itemValid(amount, errorAmount);
  }, [minus, amount, errorAmount, text, errorText]);

  const handleDate = useCallback((date) => {
    setDate(date);
    itemValid(text, errorText);
    itemValid(amount, errorAmount);
  }, [amount, errorAmount, text, errorText]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: minus ? -numberCalc(amount) : numberCalc(amount),
      date,
    };
    if (action === 'new') addTransaction(newTransaction);
    if (action === 'edit') updateTransaction(transaction._id, newTransaction);
    handleSave();
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
          <TopBar action={action} minus={minus} handleClose={handleClose} />

          <form
            onSubmit={onSubmit}
            className='new-form'
            noValidate
            autoComplete='off'
          >
            <InputAmount 
              transaction={transaction} 
              minus={minus} 
              amount={amount} 
              errorAmount={errorAmount} 
              handleAmount={handleAmount}
              handleMinus={handleMinus}
            />
            <InputText
              transaction={transaction}
              text={text}
              errorText={errorText}
              handleText={handleText}
            />
            <InputDate date={date} handleDate={handleDate}/>

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