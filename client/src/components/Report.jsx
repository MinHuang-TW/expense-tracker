import React, { Fragment, useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { newDateArr, dbDateArr, checkWeek, sortDateDsc, sortDateAsc, sortAmountDsc, sortAmountAsc } from '../utils/format';
import ReportOverview from './ReportOverview';
import Transaction from './Transaction';
import TransactionFilter from './common/TransactionFilter';
import { Tabs, Tab, Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import { whiteTheme } from '../utils/colorTheme.js';
import { ThemeProvider } from "@material-ui/styles";

const Report = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState('all');
  const [sortColumn, setSortColum] = useState('date');
  const [sortLatest, setSortLatest] = useState(true);
  const [sortDsc, setSortDsc] = useState(true);

  const timeFilters = ['day', 'week', 'month', 'year'];
  const transFilters = ['all', 'income', 'expense'];
  
  const date = newDateArr(new Date());
  const amounts = [];
  let counter = 0;

  const timebar = { 
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  }

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <Fragment>
      <div style={timebar} className='plus-bg'>
        <Tabs value={value} variant="fullWidth" aria-label="time selectors">
          {timeFilters.map((timeFilter, index) => 
            <Tab 
              key={timeFilter} label={timeFilter} 
              onClick={() => setValue(index)} 
              disableFocusRipple disableRipple
            />
          )}
        </Tabs>
      </div>

      <ReportOverview 
        selected={selected} 
        timeFilters={timeFilters} 
        value={value} 
        amounts={amounts}
      />
      
      <ThemeProvider theme={whiteTheme}>
        <ButtonGroup
          fullWidth disableRipple
          color='primary'
          style={{ background: '#65BCBF', borderRadius: 0 }}
          aria-label='transaction amount filters'
        >
          {transFilters.map(transFilter => (
            <Button
              key={transFilter}
              variant={selected === transFilter ? 'contained' : null}
              color={selected === transFilter ? 'primary' : 'secondary'}
              onClick={() => setSelected(transFilter)}
              style={{ borderRadius: 0 }}
              disableElevation disableFocusRipple disableRipple
            >
              {transFilter}
            </Button>
          ))}
        </ButtonGroup>
      </ThemeProvider>

      <div className='container'>

        <TransactionFilter
          value={value}
          text="list of today"
          sortLatest={sortLatest}
          sortDsc={sortDsc}
          handleSortDate={() => {
            setSortLatest(!sortLatest); setSortColum('date')
          }}
          handleSortAmount={() => {
            setSortDsc(!sortDsc); setSortColum('amount')
          }}
        />

        {transactions.length > 0 ? (
          <ul className='list'>
            {transactions
              .filter(transaction => {
                const data = dbDateArr(transaction.date);
                // console.log(data)
                if (value === 0) return data[2] === date[2];
                if (value === 1) return checkWeek(transaction.date);
                if (value === 2) return data[1] === date[1];
                if (value === 3) return data[0] === date[0];
                return transaction;
              })
              .filter(transaction => {
                amounts.push(transaction.amount);
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
                if (sortColumn === 'date') return sortLatest ? sortDateDsc(a, b) : sortDateAsc(a, b);
                return sortDsc ? sortAmountDsc(a, b) : sortAmountAsc(a, b);
              })
              .map(transaction => {
                counter++;
                return (
                  <Transaction 
                    key={transaction._id} 
                    transaction={transaction}
                    date
                  />
                );
              })}
            {counter === 0 && (
              <div className='list-status'>
                No {selected !== 'all' && selected} transaction<br/>
                of this {timeFilters[value]}
              </div>
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
    </Fragment>
  );
}

export default Report;