import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { checkDay, sortAmountDsc, sortAmountAsc, sortDateDsc } from '../utils/calculation';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date');
  const [sortDsc, setSortDsc] = useState(true);

  const lists = transactions
    .filter(transaction => checkDay(transaction.date))
    .sort((a, b) => {
      if (sortColumn === 'date') return sortDateDsc(a, b);
      return sortDsc ? sortAmountDsc(a, b) : sortAmountAsc(a, b);
    });

  const transition = useTransition(lists, list => list._id, {
    from: { height: 75, transform: 'translate3d(-5%,0,0)', opacity: 0 },
    enter: { height: 75, transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { height: 0, transform: 'translate3d(-200%,0,0)', opacity: 0 },
    trail: 100,
  });

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc); setSortColum('amount')
  }, [sortDsc])

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <Filter 
        value={0}
        sortDsc={sortDsc}
        handleSortAmount={handleSortAmount}
        text="today"
      />

      {lists.length > 0 ? (
        <ul className='list'>
          {transition
            .map(({ item, props, key }) => {
              return (
                <animated.div key={key} style={props}>
                  <Transaction transaction={item} menu />
                </animated.div>
              );
            })}
        </ul>
      ) : (
        <div className='list-status'>
          {loading 
            ? (<CircularProgress color='primary'/>)
            : (<p>No transaction today</p>)
          }
        </div>
      )}
    </div>
  );
};

export default TransactionList;
