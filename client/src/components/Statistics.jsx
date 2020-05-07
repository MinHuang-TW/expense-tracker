import React, { useState, useEffect, useContext } from 'react';
import { Transition, animated } from 'react-spring';
import moment from 'moment';
import { v4 as id } from 'uuid';
import { GlobalContext } from '../context/GlobalState';
import { sortAmountAsc } from '../utils/calculation';
import NewTabs from './common/NewTabs';
import List from './common/List';
import BarChart from '../components/common/BarChart';
import { CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const timeFilters = ['week', 'month', 'year'];
  const allKeys = ['income', 'expense'];
  const combinedLists = [];
  const group = [
    { order: 'e', filter: 'dddd' },
    { order: 'w', filter: 'w' },
    { order: 'MM', filter: 'MMMM' },
  ];

  const index = (date) => 
    moment(date).format(group[value]['order']);

  const format = (date) => 
    moment(date).format(group[value]['filter']);
  
  const filterDate = transactions.filter(({ date }) => 
    moment().isSame(date, timeFilters[value])
  );

  const sumAmount = Object.values(filterDate
    .reduce((result, { date, amount }) => {
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

  combinedLists.push(...sumAmount
    .sort((a, b) => sortAmountAsc(a.index, b.index)));

  if (value === 1) (combinedLists.forEach(
    list => (list['text'] = 'Week ' + list['text'])
  ));

  useEffect(() => {
    resetTransaction();
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
            <p className='text-white-s vertical-align'>
              No transaction
            </p>
          )}
        </div>
      </div>

      <div className='container' style={{ marginTop: 10 }}>
        {combinedLists.length > 0 ? (
          <ul className='list'>
            <Transition
              native
              items={combinedLists} 
              keys={item => item.id}
              from={{ transform: 'translate3d(-5%,0,0)', opacity: 0 }}
              enter={{ transform: 'translate3d(0%,0,0)', opacity: 1 }}
              leave={{ display: 'none' }}
              trail={100}
            >
              {item => props => (
                <animated.div style={props}>
                  <List transaction={item} />
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
    </>
  );
};

export default Statistics;
