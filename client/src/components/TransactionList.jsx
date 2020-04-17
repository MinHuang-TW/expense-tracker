import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { sortAmountDsc, sortAmountAsc } from '../utils/calculation';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortDsc, setSortDsc] = useState(true);
  const today = moment();
  let counter = 0;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <Filter 
        value={0} 
        sortDsc={sortDsc} 
        handleSortAmount={() => setSortDsc(!sortDsc)}
        text='list of today'
        // text={`today ${formatDate(new Date())}`}
      />

      {transactions.length > 0 ? (
        <ul className='list'>
          {transactions
            .filter(transaction => moment(transaction.date).isSame(today, 'day'))
            .sort((a, b) => sortDsc ? sortAmountDsc(a, b) : sortAmountAsc(a, b))
            .map(transaction => {
              counter++;
              return (
                <Transaction 
                  key={transaction._id} 
                  transaction={transaction} 
                  deleteButton 
                />
              );
            })}
          {counter === 0 && (
            <div className='list-status'>No transaction today</div>
          )}
        </ul>
      ) : (
        <div className='list-status'>
          {loading 
            ? <CircularProgress color='primary'/>
            : <span>
                Add your first transaction<br/>
                by clicking the green plus button
              </span>
          }
        </div>
      )}
    </div>
  );
};

export default TransactionList;
