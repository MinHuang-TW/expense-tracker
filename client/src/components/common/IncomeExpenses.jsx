import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { v4 as id } from 'uuid';

const IncomeExpenses = ({ amounts, blockStyle, titleClass }) => {
  const income = +amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = +(amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  const prevIncomeRef = useRef();
  const prevExpenseRef = useRef();

  useEffect(() => {
    prevIncomeRef.current = income;
    prevExpenseRef.current = expense;
  });

  const prevIncome = prevIncomeRef.current;
  const prevExpense = prevExpenseRef.current;

  const lists = [
    { title: 'Income', prefix: '+', start: prevIncome, end: income },
    { title: 'Expense', prefix: '-', start: prevExpense, end: expense },
  ];

  return (
    <>
      {lists.map(({ title, prefix, start, end }) => (
        <div key={id()} style={blockStyle}>
          <p className={titleClass}>{title}</p>
          <CountUp
            className='sub-amount'
            prefix={prefix}
            start={start}
            end={end}
            separator='.'
            decimal=','
            decimals={2}
            duration={0.5}
          />
        </div>
      ))}
    </>
  );
};

export default IncomeExpenses;