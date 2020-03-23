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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)'
  },
}));

const Transition = React.forwardRef(
  function Transition(props, ref) {
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
    <div>
      <Fab 
        className={classes.fab}
        color='primary'
        aria-label="add"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* <button 
        className='btn' 
        onClick={handleClickOpen}
        style={{ margin: '50px auto' }}
      >
        Add New Transaction
      </button> */}
      
      <Dialog 
        fullScreen 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              New Transaction
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <form 
          onSubmit={onSubmit}
          className={`new-form ${classes.root}`}
          noValidate 
          autoComplete="off"
        >
          <TextField
            id="standard-full-width"
            label="Description" 
            fullWidth
            required
            error={errorText}
            helperText={errorText && "Please enter the name of the transaction"}
            onChange={e => {
              setText(e.target.value);
              setErrorText(!e.target.value ? true : false)
            }}
          />
          <TextField
            id="standard-full-width"
            label="Amount" 
            fullWidth
            required
            error={errorAmount}
            helperText={errorAmount 
              ? "Please enter a valid number" 
              : "positive - Income, negative - Expense"
            }
            onChange={e => {
              setAmount(e.target.value);
              setErrorAmount(/^[+-]?[0-9]+.?[0-9]*$/.test(e.target.value) ? false : true)
            }} 
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Date"
              value={date}
              format="dd / MM / yyyy"
              margin="normal"
              // disableToolbar
              fullWidth
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
            SAVE
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTransaction;
