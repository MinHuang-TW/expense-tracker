import React from 'react';
import Total from './Total';
import PieChart from './PieChart';
import IncomeExpenses from './IncomeExpenses';

const ReportOverview = ({ selected, timeFilters, value, amounts }) => {
  const income = +amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = +(amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  const ratio = income > expense ? ((expense / income) * 100).toFixed(0) : 100;
  const data = [ratio, 100 - ratio];
  const noData = (income === 0.0) & (expense === 0.0);

  const width = 120,
        height = 120;
  const outerRadius = width / 2,
        innerRadius = outerRadius - 6;

  return (
    <div className='plus-bg box'>
      {selected === 'all' ? (
        <div className='box-balance'>
          <Total text={`${timeFilters[value]}ly balance`} amounts={amounts} />
        </div>
      ) : (
        <div className='container box-incomeExpense'>
          <div className='block-chart'>
            <div className='vertical-align block-ratio'>
              <p className='main-amount'>{noData ? 0 : ratio}</p>
              <p className='text-white-m'>%</p>
            </div>
            <div className='vertical-align' style={{ height: height }}>
              <PieChart
                data={noData ? [0, 100] : data}
                width={width}
                height={height}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
              />
            </div>
          </div>

          <div className='block-text'>
            <IncomeExpenses
              amounts={amounts}
              titleClass='text-white-s'
              blockStyle={{ margin: '10px 0' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportOverview;