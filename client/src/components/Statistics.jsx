import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Transition, animated } from 'react-spring';
import moment from 'moment';
import { v4 as id } from 'uuid';
import { GlobalContext } from '../context/GlobalState';
import { sortAmountAsc } from '../utils/calculation';
import NewTabs from './common/NewTabs';
import Transaction from './common/Transaction';
import BarChart from '../components/common/BarChart';
import { CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const today = moment();
  const timeFilters = ['week', 'month', 'year'];
  const allKeys = ['income', 'expense'];
  const combinedLists = [];

  const filterDate = (time) =>
    transactions.filter((transaction) =>
      moment(transaction.date).isSame(today, time)
    );

  const sumAmount = (time, filter, order) => {
    return Object.values(
      filterDate(time).reduce((result, { date, amount }) => {
        const index = (date) => moment(date).format(order);
        const format = (date) => moment(date).format(filter);

        !result[format(date)]
          ? (result[format(date)] = {
              id: id(),
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

  switch (value) {
    default:
    case 0:
      combinedLists.push(...sumAmount('week', 'dddd', 'e'));
      break;
    case 1:
      combinedLists.push(...sumAmount('month', 'w', 'w'));
      combinedLists.forEach((list) => (list['text'] = 'Week ' + list['text']));
      break;
    case 2:
      combinedLists.push(...sumAmount('year', 'MMMM', 'MM'));
      break;
  }

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <NewTabs types={timeFilters} value={value} setValue={setValue} />

      <div className='plus-bg box' style={{ height: '250px' }}>
        <div className='box-incomeExpense'>
          {combinedLists.length > 0 ? (
            <BarChart
              data={combinedLists}
              keys={allKeys}
              select={value}
              height='180'
              width={window.innerWidth > 320 ? 350 : 288}
            />
          ) : (
            <p className='text-white-s vertical-align'>No transaction</p>
          )}
        </div>
      </div>

      <div className='container' style={{ marginTop: 10 }}>
        {combinedLists.length > 0 ? (
          <ul className='list'>
            <Transition
              native
              items={combinedLists.sort((a, b) => sortAmountAsc(a.index, b.index))} 
              keys={item => item.id}
              from={{ transform: 'translate3d(-5%,0,0)', opacity: 0 }}
              enter={{ transform: 'translate3d(0%,0,0)', opacity: 1 }}
              leave={{ display: 'none' }}
              trail={150}
            >
              {item => props => (
                <animated.div style={props}>
                  <Transaction transaction={item} />
                </animated.div>)
              }
            </Transition>
          </ul>
        ) : (
          <div className='list-status'>
            {loading 
              ? (<CircularProgress color='primary' />) 
              : (<p>No transaction of the {timeFilters[value]}</p>)
            }
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Statistics;
