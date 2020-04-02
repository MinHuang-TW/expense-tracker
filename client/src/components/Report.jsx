import React, { Fragment, useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { checkDate, checkWeek } from '../utils/format';
import Transaction from './Transaction';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';

const Report = () => {
  const [value, setValue] = useState(0);
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [selected, setSelected] = useState('all');
  const [progress, setProgress] = useState(0);

  const timeFilters = ['daily', 'weekly', 'monthly', 'yearly'];
  const date = checkDate(new Date());
  const dateArr = data => data.slice(0, 10).split('-');

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
    <Fragment>
      <Tabs
        value={value} variant='fullWidth'
        indicatorColor="primary"
        textColor="primary"
        aria-label="disabled tabs example"
      >
        {timeFilters.map((timeFilter, index) => 
          <Tab 
            key={timeFilter} 
            label={timeFilter} 
            onClick={() => setValue(index)} />
        )}
      </Tabs>

      <div className='container'>
        <ButtonGroup
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
        </ButtonGroup>

        {transactions.length > 0 ? (
          <ul className='list'>
            {transactions
              .filter(transaction => {
                const data = dateArr(transaction.date);
                if (value === 0) return data[2] === date[2];
                if (value === 1) return data[1] === date[1];
                if (value === 2) return checkWeek(transaction.date);
                if (value === 3) return data[0] === date[0];
                return transaction;
              })
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
            {loading 
              ? <CircularProgress variant='determinate' value={progress} color='secondary'/>
              : 'No transaction'}
          </div>
        )}
      </div>


    </Fragment>
  );
}

export default Report;