import React, { Fragment } from 'react';
import Balance from './Balance';
import IncomExpenses from './IncomeExpenses';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const Dashboard = () => {

  return ( 
    <Fragment>
      <div className="container-top">
        <Balance />
        <IncomExpenses />
      </div>
      <TransactionList />
      <AddTransaction />
    </Fragment>
  );
}

export default Dashboard;