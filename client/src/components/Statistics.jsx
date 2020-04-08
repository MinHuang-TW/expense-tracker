import React, { Fragment, useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const timeFilters = ['week', 'month', 'year'];
  const incomeLists = [];
  const expenseLists = [];
  const today = moment();
  
  const income = (time, filter) => {
    const temp = {};

    transactions
      .filter(transaction => transaction.amount > 0)
      .filter(transaction => moment(transaction.date).isSame(today, time))
      .map(transaction => {
        const date = moment(transaction.date).format(filter);
        return temp.hasOwnProperty(date) 
          ? temp[date] += transaction.amount
          : temp[date] = transaction.amount;
      })

    Object.entries(temp).forEach(([key, value]) => {
      incomeLists.push({ 'text': `${key}`, 'amount': `${value}` });
    });
  }

  const expense = (time, filter) => {
    const temp = {};

    transactions
      .filter(transaction => transaction.amount < 0)
      .filter(transaction => moment(transaction.date).isSame(today, time))
      .map(transaction => {
        const date = moment(transaction.date).format(filter);
        return temp.hasOwnProperty(date) 
          ? temp[date] += transaction.amount
          : temp[date] = transaction.amount;
      })

    Object.entries(temp).forEach(([key, value]) => {
      expenseLists.push({ 'text': `${key}`, 'amount': `${value}` });
    });
  }

  if (value === 0) {
    expense('week', 'e'); income('week', 'e');
  } else if (value === 1) {
    expense('month', 'w'); income('month', 'w');
  } else if (value === 2) {
    expense('year', 'MM'); income('year', 'MM');
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return ( 
    <Fragment>
      <div className='plus-bg time-bar'>
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

      <div className='plus-bg box'>
        <div className='container box-incomeExpense'>

        </div>
      </div>

      <div className="container">
        {transactions.length > 0 ? (
          <ul className='list'>
            {incomeLists.concat(expenseLists)
              .sort((a, b) => a.text < b.text ?  -1 : 1)
              .map((list, index) => {
                if (value === 0) {
                  list.text = moment().day(list.text).format('dddd');
                }
                if (value === 1) {
                  list.text = `${moment().day("Sunday").week(list.text).format('DD MMM')} - 
                    ${moment().day("Saturday").week(list.text).format('DD MMM')}`;
                }
                if (value === 2) {
                  list.text = moment().month(list.text - 1).format('MMMM');
                }

                return <Transaction key={index} transaction={list} />
              })
            }

            {/* {expenseLists === 0 && (
              <div className='list-status'>
                No transaction<br/>
                of the {timeFilters[value]}
              </div>
            )} */}
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

export default Statistics;