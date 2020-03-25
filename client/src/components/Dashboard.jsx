import React, { Fragment } from 'react';
import Balance from './Balance';
import IncomExpenses from './IncomeExpenses';
import TransactionList from './TransactionList';

const Dashboard = () => {
  return ( 
    <Fragment>
      <div className="container-top">
        <Balance />
        <IncomExpenses />
      </div>
      <TransactionList />
    </Fragment>
  );
}
 
export default Dashboard;