import React, { Fragment, useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './common/Transaction';
import BarChart from '../components/common/BarChart';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const today = moment();
  const timeFilters = ['week', 'month', 'year'];
  const allKeys = ['income', 'expense'];
  const combinedLists = [];

  const filterDate = (time) => {
    return transactions.filter((transaction) =>
      moment(transaction.date).isSame(today, time)
    );
  };

  const sumAmount = (time, filter, order) => {
    return Object.values(
      filterDate(time).reduce((result, { date, amount }) => {
        const index = (date) => moment(date).format(order);
        const format = (date) => moment(date).format(filter);

        !result[format(date)]
          ? (result[format(date)] = {
              index: +index(date),
              text: format(date),
              income: amount > 0 ? amount : 0,
              expense: amount < 0 ? amount : 0,
            })
          : amount > 0
          ? (result[format(date)].income += amount)
          : (result[format(date)].expense += amount);
        return result;
      }, {})
    );
  };

  if (value === 0) {
    combinedLists.push(...sumAmount('week', 'dddd', 'e'));
  } else if (value === 1) {
    const filter = 'D MMM';
    const sunday = (weekNum) => moment().day(0).week(weekNum).format(filter);
    const saturday = (weekNum) => moment().day(6).week(weekNum).format(filter);
    const formatWeek = (weekNum) => `${sunday(weekNum)} - ${saturday(weekNum)}`;

    combinedLists.push(...sumAmount('month', 'w', 'w'));
    combinedLists.forEach((list) => (list['text'] = formatWeek(list.index)));
  } else if (value === 2) {
    combinedLists.push(...sumAmount('year', 'MMMM', 'MM'));
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
        <div className='box-incomeExpense'>
          <BarChart
            data={combinedLists}
            keys={allKeys}
            select={value}
            width='350'
            height='145'
          />
        </div>
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
                No transaction of the {timeFilters[value]}
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
