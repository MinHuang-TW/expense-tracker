import React from 'react';
import { TextField, InputAdornment, Switch } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
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
}));

export const InputAmount = ({
  data,
  minus,
  amount,
  errorAmount,
  handleAmount,
  handleMinus,
}) => {
  const classes = useStyles();

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

  return (
    <div className='input-amount'>
      <TextField
        id='amount'
        label='Amount'
        required
        autoFocus
        value={data && data.amount && amount}
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
        helperText={errorAmount
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
  );
};

export const InputText = ({ data, text, errorText, handleText }) => {
  const classes = useStyles();

  return (
    <TextField
      id='text'
      label='Description'
      fullWidth
      required
      value={data && data.text && text}
      error={errorText}
      InputLabelProps={{ shrink: true }}
      InputProps={{ className: classes.textColor }}
      helperText={errorText && 'Please describe the transaction'}
      onChange={handleText}
    />
  );
};

export const InputDate = ({ date, handleDate }) => {
  const classes = useStyles();
  const dateFormat = 'd MMM, yyyy';

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, dateFormat, { locale: this.locale });
    }
  }

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils}>
      <KeyboardDatePicker
        id='date'
        label='Date'
        value={date}
        format={dateFormat}
        onChange={handleDate}
        InputProps={{ className: classes.textColor }}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};