import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { checkRecent, sortDateAmount } from '../utils/calculation';
import { transitionConfig } from '../utils/animation';
import Total from './common/Total';
import IncomExpenses from './common/IncomeExpenses';
import Filter from './common/Filter';
import ListMenu from './common/ListMenu';
import { CircularProgress } from '@material-ui/core';

const Dashboard = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);
  const amounts = transactions.map(transaction => transaction.amount);

  const lists = transactions
    .filter(({ date }) => checkRecent(date))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(
    lists, 
    list => list._id, 
    transitionConfig(86, 200),
  );

  const handleSortDate = useCallback(() => {
    setSortLatest(!sortLatest); 
    setSortColum('date');
  }, [sortLatest]);

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc);
    setSortColum('amount');
  }, [sortDsc]);

  
  useEffect(() => {
    resetTransaction();
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return ( 
    <>
      <div className="container-top">
        <Total amounts={amounts} />
        <div className="inc-exp-container" style={{ marginBottom: 0 }}>
          <IncomExpenses amounts={amounts} titleClass='sub-title' />
        </div>
      </div>

      <div className='container'>
        <Filter
          sortLatest={sortLatest}
          sortDsc={sortDsc}
          handleSortDate={handleSortDate}
          handleSortAmount={handleSortAmount}
          sortText='recent'
        />

        {lists.length > 0 ? (
          <ul className='list list-bottom'>
            {transition.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <ListMenu data={item} date='relative' />
              </animated.div>
            ))}
          </ul>
        ) : (
          <div className='list-status'>
            {loading 
              ? (<CircularProgress color='primary' />) 
              : (<p>No recent transaction</p>)}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;