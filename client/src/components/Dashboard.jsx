import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
// import Balance from './Balance';
import Total from './common/Total';
import IncomExpenses from './common/IncomeExpenses';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);

  return ( 
    <Fragment>
      <div className="container-top">
        {/* <Balance /> */}
        <Total amounts={amounts} />
        <div className="inc-exp-container" style={{ marginBottom: 0 }}>
          <IncomExpenses amounts={amounts} />
        </div>
      </div>
      <TransactionList />
    </Fragment>
  );
}

export default Dashboard;