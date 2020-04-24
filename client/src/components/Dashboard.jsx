import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { checkDay, sortAmountDsc, sortAmountAsc, sortDateDsc, sortDateAsc } from '../utils/calculation';
import Total from './common/Total';
import IncomExpenses from './common/IncomeExpenses';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date');
  const [sortLatest, setSortLatest] = useState(true);
  const [sortDsc, setSortDsc] = useState(true);

  const lists = transactions
    .filter((transaction) => checkDay(transaction.date))
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
    from: { height: 75, transform: 'translate3d(-5%,0,0)', opacity: 0 },
    enter: { height: 75, transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { height: 0, transform: 'translate3d(-5000%,0,0)', opacity: 0 },
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
    <>
      <Filter
        sortLatest={sortLatest}
        sortDsc={sortDsc}
        handleSortDate={handleSortDate}
        handleSortAmount={handleSortAmount}
        sortText='today'
      />

      {lists.length > 0 ? (
        <ul className='list'>
          {transition.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <Transaction transaction={item} />
            </animated.div>
          ))}
        </ul>
      ) : (
        <div className='list-status'>
          {loading 
            ? (<CircularProgress color='primary' />) 
            : (<p>No transaction today</p>)}
        </div>
      )}
    </>
  );
};

const Dashboard = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);

  return ( 
    <>
      <div className="container-top">
        <Total amounts={amounts} />
        <div className="inc-exp-container" style={{ marginBottom: 0 }}>
          <IncomExpenses amounts={amounts} />
        </div>
      </div>
      <div className='container'>
        <TransactionList />
      </div>
    </>
  );
}

export default Dashboard;