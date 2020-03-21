import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const classes = {
    text: {
      color: '#fff',
      opacity: 0.5,
      fontSize: '16px',
      marginBottom: '10px',
      letterSpacing: '1px'
    },
  }

  return (
    <div className='inc-exp-container'>
      <div>
        <p style={classes.text}>Income</p>
        <p className='money plus'>+ {numberWithCommas(income)}</p>
      </div>
      <div>
        <p style={classes.text}>Expense</p>
        <p className='money minus'>- {numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
