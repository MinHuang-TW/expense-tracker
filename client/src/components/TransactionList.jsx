import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { checkWeek, sortAmountDsc, sortAmountAsc, sortDateDsc, sortDateAsc } from '../utils/calculation';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date');
  const [sortLatest, setSortLatest] = useState(true);
  const [sortDsc, setSortDsc] = useState(true);

  const lists = transactions
    .filter((transaction) => checkWeek(transaction.date))
    .sort((a, b) => {
      if (sortColumn === 'date') {
        return sortLatest 
          ? sortDateDsc(a, b) 
          : sortDateAsc(a, b);
      }
      return sortDsc 
        ? sortAmountDsc(a.amount, b.amount) 
        : sortAmountAsc(a.amount, b.amount);
    });

  const transition = useTransition(lists, (list) => list._id, {
    from: { height: 86, transform: 'translate3d(-5%,0,0)', opacity: 0 },
    enter: { height: 86, transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { height: 0, transform: 'translate3d(-300%,0,0)', opacity: 0 },
    trail: 200,
  });

  const handleSortDate = useCallback(() => {
    setSortLatest(!sortLatest); 
    setSortColum('date');
  }, [sortLatest]);

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc);
    setSortColum('amount');
  }, [sortDsc]);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <Filter
        sortLatest={sortLatest}
        sortDsc={sortDsc}
        handleSortDate={handleSortDate}
        handleSortAmount={handleSortAmount}
      />

      {lists.length > 0 ? (
        <ul className='list'>
          {transition.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <Transaction transaction={item} date />
            </animated.div>
          ))}
        </ul>
      ) : (
        <div className='list-status'>
          {loading 
            ? (<CircularProgress color='primary' />) 
            : (<p>No recent transactions</p>)}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
