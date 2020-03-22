import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [errorText, setErrorText] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date
    };
    addTransaction(newTransaction);
    setAmount(null);
    setText('');
    setDate(null);

    setOpen(false);
  };

  return (
    <>
      <button 
        className='btn' 
        onClick={handleClickOpen}
        style={{ margin: '50px auto' }}
      >
        Add New Transaction
      </button>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New Transaction
            </Typography>
          </Toolbar>
        </AppBar>

        <form 
          onSubmit={onSubmit}
          className={classes.root} 
          noValidate 
          autoComplete="off"
          style={{ 
            margin: 'auto',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TextField
            error={errorText}
            required
            id="standard-required"
            label="Description" 
            helperText={errorText && "Please enter the name of the transaction"}
            onChange={e => {
              setText(e.target.value);
              setErrorText(!e.target.value ? true : false)
            }}
          />
          <TextField
            error={errorAmount}
            required
            id="standard-required"
            label="Amount" 
            onChange={e => {
              setAmount(e.target.value);
              setErrorAmount(/^[+-]?[0-9]+.?[0-9]*$/.test(e.target.value) ? false : true)
            }} 
            helperText={errorAmount 
              ? "Please enter a valid number" 
              : "positive - Income, negative - Expense"
            }
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="dd / MM / yyyy"
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              value={date}
              onChange={date => setDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        <button 
          className='btn' 
          style={{ marginTop: '50px' }}
          disabled={!text || !amount || errorAmount ? true : false}
        >
          Confirm
        </button>
        </form>
      </Dialog>
    </>
  );
};

export default AddTransaction;
