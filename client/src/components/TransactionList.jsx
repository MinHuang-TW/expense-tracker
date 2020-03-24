import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [selected, setSelected] = useState('all');
  const [progress, setProgress] = useState(0);

  const transFilters = ['all', 'income', 'expense'];
  let counter = 0;

  useEffect(() => {
    const tick = () => {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    };
    const timer = setInterval(tick, 20);

    getTransactions();

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ButtonGroup
        fullWidth disableRipple
        color='primary'
        aria-label='outlined primary button group'
        style={{ marginBottom: '10px' }}
      >
        {transFilters.map(transFilter => (
          <Button
            key={transFilter}
            disableElevation
            variant={selected === transFilter ? 'contained' : null}
            color={selected === transFilter ? 'primary' : null}
            onClick={() => setSelected(transFilter)}
          >
            {transFilter}
          </Button>
        ))}
      </ButtonGroup>

      {transactions.length > 0 ? (
        <ul className='list'>
          {transactions
            .filter(transaction => {
              switch (selected) {
                case 'income':
                  return transaction.amount > 0;
                case 'expense':
                  return transaction.amount < 0;
                default:
                  return transaction;
              }
            })
            .sort((a, b) => {
              let dateA = new Date(a.date);
              let dateB = new Date(b.date);
              
              if (dateA < dateB) return 1;
              if (dateA > dateB) return -1;
              return 0;
            })
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
          {loading ? (
            <CircularProgress
              variant='determinate'
              value={progress}
              color='secondary'
            />
          ) : (
            'No transaction'
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
