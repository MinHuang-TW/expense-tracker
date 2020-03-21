import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#00bcd4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00bcd4',
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    background: '#00bcd4'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& > *': {
      width: '80vw',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(null);
  const { addTransaction } = useContext(GlobalContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    };
    addTransaction(newTransaction);
    setAmount(null);
    setText('');

    setOpen(false);
  };

  return (
    <>
      {/* <p>Add New Transaction</p> */}
      {/* <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Transaction</label>
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Enter...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount
            <br />
            (positive - income, negative - expense)
          </label>
          <input
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>Add transaction</button>
      </form> */}
      <button className='btn' onClick={handleClickOpen}>
        Add New Transaction
      </button>
      
      <div>
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
            noValidate autoComplete="off"
            style={{ 
              marginTop: '10vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CssTextField 
              id="custom-css-standard-input" 
              label="Description" 
              onChange={e => setText(e.target.value)}
              className={classes.margin}
              style={{ marginTop: '50px' }}
            />
            <CssTextField 
              id="custom-css-standard-input" 
              label="Amount" 
              onChange={e => setAmount(e.target.value)} 
              className={classes.margin}
              style={{ marginTop: '50px' }}
              helperText="( positive - income, negative - expense )"
            />
            {/* <div className='form-control'>
              <label htmlFor='text'>Transaction</label>
              <input
                type='text'
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder='Enter...'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='amount'>
                Amount
                <br />
                (positive - income, negative - expense)
              </label>
              <input
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='Enter amount...'
              />
            </div> */}
            <button 
              className='btn' 
              style={{ 
                opacity: !text || !amount ? 0.3 : 1,
                cursor: !text || !amount ? 'default' : 'pointer',
              }}
              disabled={!text || !amount ? true : false}
            >
              Confirm
            </button>
          </form>

        </Dialog>
      </div>
    </>
  );
};

export default AddTransaction;
