import React, { Fragment } from 'react';
// import { GlobalContext } from '../context/GlobalState';
import { numberEuro } from '../../utils/format';

const IncomeExpenses = ({ amounts }) => {
  // const { transactions } = useContext(GlobalContext);
  // const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <Fragment>
      <div>
        <p className='sub-title'>Income</p>
        <p className='sub-amount'>+{numberEuro(income)}</p>
      </div>
      <div>
        <p className='sub-title'>Expense</p>
        <p className='sub-amount'>-{numberEuro(expense)}</p>
      </div>
    </Fragment>
  );
};

export default IncomeExpenses;
