import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';

const Total = ({ amounts, text = 'total balance' }) => {
  const total = +amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const sign = total === 0 ? '' : total < 0 ? '-' : '+';
  const prevTotalRef = useRef();
  useEffect(() => {
    prevTotalRef.current = Math.abs(total);
  });
  const prevTotal = prevTotalRef.current;

  return (
    <>
      <p className='main-title'>{text}</p>
      <CountUp
        className='main-amount'
        prefix={`${sign}€`}
        start={prevTotal}
        end={Math.abs(total)}
        separator='.'
        decimal=','
        decimals={2}
        duration={0.5}
      />
    </>
  );
};

export default Total;