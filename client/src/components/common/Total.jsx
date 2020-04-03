import React from 'react';
import { numberEuro } from '../../utils/format';

const Total = ({ amounts, text = 'total balance' }) => {
  const total = +amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const sign = total === 0 ? null : total < 0 ? '-' : '+';

  return (
    <div className='container-top' style={{ padding: '30px 0' }}>
      <p className='main-title'>{text}</p>
      <p className='main-amount'>
        {sign}€{numberEuro(Math.abs(total))}
      </p>
    </div>
  );
};

export default Total;
