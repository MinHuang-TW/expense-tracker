import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Redirect } from "react-router-dom";
import Balance from './Balance';
import IncomExpenses from './IncomeExpenses';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const Dashboard = () => {
  const { error } = useContext(GlobalContext);
  // const auth = async () => await loadUser();
  if (error) window.location = '/register'

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