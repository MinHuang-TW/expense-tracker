import React, { useState, useContext, Fragment } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberValid, numberCalc } from '../utils/format';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';

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
  sign: {
    width: '20px', 
    textAlign: 'center',
  },
  input : {
    fontSize: '36px',
  },
  inputPlus: {
    color: '#65BCBF',
  },
  inputMinus: {
    color: '#F8777D',
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

const AntSwitch = withStyles(theme => ({
  root: {
    width: 50,
    height: 30,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(20px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#F8777D',
        borderColor: '#F8777D',
      },
    },
  },
  thumb: {
    width: 26,
    height: 26,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 30 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
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

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
    setDate(new Date());
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
        disableRipple
        className={`${classes.fab} no-outline`}
        color='primary'
        aria-label='add'
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      
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

        <form onSubmit={onSubmit} className="new-form" noValidate autoComplete="off">
          <div className='input-amount'>
            <div style={{ marginRight: '10px' }}>
              <TextField
                id="standard-full-width"
                label="Amount"
                required autoFocus
                InputProps={{
                  className: `${classes.input} ${minus ? classes.inputMinus : classes.inputPlus}`,
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.sign}>
                        {minus
                          ? <div className={classes.inputMinus}>-</div> 
                          : <div className={classes.inputPlus}>+</div>
                        }
                      </div>
                    </InputAdornment>)
                  }}
                error={errorAmount}
                helperText={errorAmount 
                  ? "Please enter a valid number" 
                  : "Toggle between Income & Expense"
                }
                onChange={e => {
                  setAmount(e.target.value);
                  setErrorAmount(numberValid(e.target.value) ? false : true)
                }} 
              />
            </div>
            <div style={{ width: '50px' }}>
              <AntSwitch checked={minus} onChange={() => setMinus(!minus)} />
            </div>
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
              setErrorText(!e.target.value ? true : false)
            }}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Date"
              value={date}
              format="dd / MM / yyyy"
              margin="normal"
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
    </Fragment>
  );
};

export default AddTransaction;
