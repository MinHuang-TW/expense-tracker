import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { sortAmountDsc, sortAmountAsc, dbDateArr, newDateArr } from '../utils/format';
import TransactionFilter from './common/TransactionFilter';
import Transaction from './Transaction';
import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);
  const [sortDsc, setSortDsc] = useState(true);

  const date = newDateArr(new Date());
  let counter = 0;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <TransactionFilter 
        value={0} 
        sortDsc={sortDsc} 
        handleSortAmount={() => setSortDsc(!sortDsc)}
        text="Today's record"
        // text={`today ${formatDate(new Date())}`}
      />

      {transactions.length > 0 ? (
        <ul className='list'>
          {transactions
            .filter(transaction => {
                const data = dbDateArr(transaction.date);
                return (data[2] === date[2] 
                  && data[1] === date[1] 
                  && data[0] === date[0]
                );
              })
            .sort((a, b) => sortDsc ? sortAmountDsc(a, b) : sortAmountAsc(a, b))
            .map(transaction => {
              counter++;
              return (
                <Transaction key={transaction._id} transaction={transaction} />
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
