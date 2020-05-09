import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { checkDay, sortDateAmount } from '../utils/calculation';
import Total from './common/Total';
import IncomExpenses from './common/IncomeExpenses';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import { CircularProgress } from '@material-ui/core';

const Dashboard = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date');
  const [sortLatest, setSortLatest] = useState(true);
  const [sortDsc, setSortDsc] = useState(true);
  const amounts = transactions.map(transaction => transaction.amount);

  const lists = transactions
    .filter(({ date }) => checkDay(date))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(lists, list => list._id, {
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
      <div className="container-top">
        <Total amounts={amounts} />
        <div className="inc-exp-container" style={{ marginBottom: 0 }}>
          <IncomExpenses amounts={amounts} />
        </div>
      </div>
      <div className='container'>
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
                <Transaction data={item} />
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
      </div>
    </>
  );
}

export default Dashboard;