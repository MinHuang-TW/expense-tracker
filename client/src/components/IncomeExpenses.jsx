import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberEuro } from '../utils/format';

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className='inc-exp-container'>
      <div>
        <p className='sub-title'>Income</p>
        <p className='sub-amount'>+{numberEuro(income)}</p>
      </div>
      <div>
        <p className='sub-title'>Expense</p>
        <p className='sub-amount'>-{numberEuro(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
