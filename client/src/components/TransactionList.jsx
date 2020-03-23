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

  const transactionsIncome = transactions.filter(e => e.amount > 0);
  const transactionsExpense = transactions.filter(e => e.amount < 0);
  const transFilters = [
    {name: 'all', list: transactions}, 
    {name: 'income', list: transactionsIncome}, 
    {name: 'expense', list: transactionsExpense},
  ];


  useEffect(() => {
    const tick = () => {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }
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
        fullWidth color="primary" 
        aria-label="outlined primary button group"
        style={{ marginBottom: '10px' }}
      >
        {transFilters.map(transFilter =>
          <Button 
            key={transFilter.name}
            disableElevation
            variant={selected === transFilter.name ? 'contained' : null} 
            color={selected === transFilter.name ? 'primary' : null}  
            onClick={() => setSelected(transFilter.name)}
          >
            {transFilter.name}
          </Button>
        )}
      </ButtonGroup>

      {transactions.length > 0
        ? <ul className='list'>
            {selected === 'all' 
              ? transactions.map(transaction => 
                <Transaction key={transaction._id} transaction={transaction} />
              )
              : selected === 'income' && transactionsIncome.length > 0 
                ? transactionsIncome.map(transaction => 
                  <Transaction key={transaction._id} transaction={transaction} />
                )
              : selected === 'expense' && transactionsExpense.length > 0 
                ? transactionsExpense.map(transaction => 
                    <Transaction key={transaction._id} transaction={transaction} />
                  )
              : <div className="list-status">
                  No {selected} transaction
                </div>
            }
            <div style={{ height: '56px' }} /> 
          </ul>
        : (<div className='list-status'>
            {loading 
              ? <CircularProgress variant="determinate" value={progress} color='secondary' /> 
              : 'No transaction'
            }
          </div>)
      }
    </div>
  );
};

export default TransactionList;
