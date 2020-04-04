import React, { Fragment } from 'react';
import { numberEuro } from '../../utils/format';

const Total = ({ amounts, text = 'total balance' }) => {
  const total = +amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const sign = total === 0 ? null : total < 0 ? '-' : '+';

  return (
    <Fragment>
      <p className='main-title'>{text}</p>
      <p className='main-amount'>
        {sign}€{numberEuro(Math.abs(total))}
      </p>
    </Fragment>
  );
};

export default Total;
