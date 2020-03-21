import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const classes = {
    text: {
      color: 'white',
      opacity: 0.5,
      fontSize: '18px',
      marginBottom: '10px',
      letterSpacing: '1px'
    },
    balance: {
      color: 'white',
      fontSize: '45px'
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={classes.text}>Overall Balance</p>
      <p style={classes.balance}>$ {numberWithCommas(total)}</p>
    </div>
  );
};

export default Balance;
