import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const [selected, setSelected] = useState('all');

  const transFilters = ['all', 'income', 'expense'];

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ButtonGroup 
        fullWidth color="primary" 
        aria-label="outlined primary button group"
        style={{ marginBottom: '10px' }}
      >
        {transFilters.map(transFilter =>
          <Button 
            key={transFilter}
            disableElevation
            variant={selected === transFilter ? 'contained' : null} 
            color={selected === transFilter ? 'primary' : null}  
            onClick={() => setSelected(transFilter)}
          >
            {transFilter}
          </Button>
        )}
      </ButtonGroup>

      {transactions.length > 0
        ? <ul className='list'>
            {selected === 'all' 
              ? transactions
                .map(transaction => (
                  <Transaction key={transaction._id} transaction={transaction} />
                ))
              : transactions
                .filter(transaction => selected === 'income'
                  ? (transaction.amount > 0)
                  : (transaction.amount < 0) 
                )
                .map(transaction => (
                  <Transaction key={transaction._id} transaction={transaction} />
                ))
            }
            <div style={{ height: '56px' }} /> 
          </ul>
        : <div>No {selected !== 'all' ? selected : null} transaction</div>
      }



    </div>
  );
};

export default TransactionList;
