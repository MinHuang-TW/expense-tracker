import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { checkDay, sortAmountDsc, sortAmountAsc } from '../utils/calculation';
import Filter from './common/Filter';
import Transaction from './common/Transaction';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortDsc, setSortDsc] = useState(true);
  let counter = 0;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <Filter 
        value={0} 
        sortDsc={sortDsc} 
        handleSortAmount={() => setSortDsc(!sortDsc)}
        text="today"
      />

      {transactions.length > 0 ? (
        <ul className='list'>
          {transactions
            .filter(transaction => checkDay(transaction.date))
            .sort((a, b) => sortDsc ? sortAmountDsc(a, b) : sortAmountAsc(a, b))
            .map(transaction => {
              counter++;
              return (
                <Transaction key={transaction._id} transaction={transaction} menu />
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
