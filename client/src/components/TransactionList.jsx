import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  const classes = {
    text: {
      color: '#00bcd4',
      fontSize: '16px',
      marginBottom: '10px',
      letterSpacing: '1px'
    },
  }

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p style={classes.text}>Recent Transactions</p>
      {transactions.length > 0 
        ? <ul className='list'>
          {transactions
            .map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))
          }
          <div style={{ height: '56px' }} /> 
        </ul>
        : <div>No transaction</div>
      }
    </div>
  );
};

export default TransactionList;
