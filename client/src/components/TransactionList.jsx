import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { sortDateDsc } from '../utils/format';
import Transaction from './Transaction';
import { Button, ButtonGroup, CircularProgress, Typography } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [selected, setSelected] = useState('all');

  const transFilters = ['all', 'income', 'expense'];
  let counter = 0;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className='input-amount plus' style={{ textTransform: 'uppercase' }}>
        <Typography variant="body2">Recent transactions</Typography>
      </div>
      {/* <ButtonGroup
        fullWidth disableRipple
        color='primary'
        aria-label='outlined primary button group'
        style={{ marginBottom: '10px' }}
      >
        {transFilters.map(transFilter => (
          <Button
            key={transFilter}
            style={{ borderRadius: 0 }}
            disableElevation disableFocusRipple disableRipple
            variant={selected === transFilter ? 'contained' : null}
            color={selected === transFilter ? 'primary' : null}
            onClick={() => setSelected(transFilter)}
          >
            {transFilter}
          </Button>
        ))}
      </ButtonGroup> */}

      {transactions.length > 0 ? (
        <ul className='list'>
          {transactions
            // .filter(transaction => {
            //   switch (selected) {
            //     case 'income':
            //       return transaction.amount > 0;
            //     case 'expense':
            //       return transaction.amount < 0;
            //     default:
            //       return transaction;
            //   }
            // })
            .sort((a, b) => sortDateDsc(a, b))
            .map(transaction => {
              counter++;
              return (
                <Transaction key={transaction._id} transaction={transaction} />
              );
            })}
          {counter === 0 && (
            <div className='list-status'>No {selected} transaction</div>
          )}
        </ul>
      ) : (
        <div className='list-status'>
          {loading 
            ? <CircularProgress color='primary'/>
            : 'No transaction'}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
