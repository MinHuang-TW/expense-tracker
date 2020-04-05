import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberEuro } from '../utils/format';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = +amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const sign = total === 0 ? null : total < 0 ? '-' : '+';

  return (
    <div>
      <p className='main-title'>Total Balance</p>
      <p className='main-amount'>
        {sign}€{numberEuro(Math.abs(total))}
        {/* € {numberEuro(total)} */}
      </p>
    </div>
  );
};

export default Balance;