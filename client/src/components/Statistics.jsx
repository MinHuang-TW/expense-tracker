import React, { Fragment, useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const today = moment();
  const timeFilters = ['week', 'month', 'year'];
  const incomeLists = [],
        expenseLists = [],
        combinedLists = [];
  const lists = [
    { type: 'income', array: incomeLists },
    { type: 'expense', array: expenseLists },
  ];

  const sortDate = (type, time) => {
    return transactions
      .filter((transaction) => moment(transaction.date).isSame(today, time))
      .filter((transaction) => {
        if (type === 'expense') return transaction.amount < 0;
        if (type === 'income') return transaction.amount > 0;
        if (type === 'all') return transaction.amount;
        return transaction.amount;
      });
  };

  const sumAmount = (type, time, filter, order) => {
    return Object.values(
      sortDate(type, time).reduce((result, { date, amount }) => {
        const index = (date) => moment(date).format(order);
        const format = (date) => moment(date).format(filter);

        !result[format(date)]
          ? (result[format(date)] = {
              index: +index(date),
              text: format(date),
              amount,
            })
          : (result[format(date)].amount += amount);

        return result;
      }, {})
    );
  };

  if (value === 0) {
    lists.map((list) =>
      list['array'].push(...sumAmount(list.type, 'week', 'dddd', 'e'))
    );
    combinedLists.push(...incomeLists, ...expenseLists);

  } else if (value === 1) {
    const filter = 'D MMMM';
    const sunday = weekNum => moment().day(0).week(weekNum).format(filter);
    const saturday = weekNum => moment().day(6).week(weekNum).format(filter);
    const formatWeek = weekNum => `${sunday(weekNum)} - ${saturday(weekNum)}`;

    lists.map((list) =>
      list['array'].push(...sumAmount(list.type, 'month', 'w', 'w'))
    );
    combinedLists.push(...incomeLists, ...expenseLists);
    combinedLists.forEach(list => list['text'] = formatWeek(list.index));

  } else if (value === 2) {
    lists.map((list) =>
      list['array'].push(...sumAmount(list.type, 'year', 'MMMM', 'MM'))
    );
    combinedLists.push(...incomeLists, ...expenseLists);
  }

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='plus-bg time-bar'>
        <Tabs value={value} variant='fullWidth' aria-label='time selectors'>
          {timeFilters.map((timeFilter, index) => (
            <Tab
              key={timeFilter}
              label={timeFilter}
              onClick={() => setValue(index)}
              disableFocusRipple
              disableRipple
            />
          ))}
        </Tabs>
      </div>

      <div className='plus-bg box'>
        <div className='container box-incomeExpense'></div>
      </div>

      <div className='container'>
        {transactions.length > 0 ? (
          <ul className='list'>
            {combinedLists
              .sort((a, b) => (a.index < b.index ? -1 : 1))
              .map((list, index) => (
                <Transaction key={index} transaction={list} />
              ))}
            {combinedLists.length === 0 && (
              <div className='list-status'>
                No expense transaction<br />of the {timeFilters[value]}
              </div>
            )}
          </ul>
        ) : (
          <div className='list-status'>
            {loading ? <CircularProgress color='primary' /> : 'No transaction'}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Statistics;
