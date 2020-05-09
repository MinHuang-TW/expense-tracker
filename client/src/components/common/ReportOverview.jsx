import React from 'react';
import Total from './Total';
import PieChart from './PieChart';
import { numberEuro } from '../../utils/format';

const ReportOverview = ({ selected, timeFilters, value, amounts }) => {

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  const incomeExpense = [
    { name: 'income', amount: income, sign: '+'},
    { name: 'expense', amount: expense, sign: '-'},
  ];
  
  const noData = income === '0.00' & expense === '0.00';
  const ratio = +income > +expense ? (expense / income * 100).toFixed(0) : 100;
  const data = [ratio, 100 - ratio];

  const width = 120, height = 120;
  const outerRadius = width / 2;
  const innerRadius = outerRadius - 6;

  return (
    <div className='plus-bg box'>
      {selected === 'all' ? (
        <div className='box-balance'>
          <Total text={`${timeFilters[value]}ly balance`} amounts={amounts} />
        </div>
      ) : (
        <div className='container box-incomeExpense'>
          <div className='block-chart'>
            {!noData 
              ? <div className='vertical-align block-ratio'>
                  <p className='main-amount'>{ratio}</p>
                  <p className='text-white-m'>%</p>
                </div> 
              : null
            }
            {!noData 
              ? <div className="vertical-align" style={{ height: height }}>
                  <PieChart
                    data={data}
                    width={width}
                    height={height}
                    outerRadius={outerRadius}
                    innerRadius={innerRadius}
                  />
                </div>
              : <p className='text-white-s vertical-align'>
                  No transaction
                </p>
            }
          </div>

          <div className='block-text'>
            {incomeExpense.map(list => 
              <div key={list.name} style={{ margin: '10px 0'}}>
                <p className='text-white-s'>
                  {list.name}
                </p>
                <p className='text-white-l'>
                  {list.sign}{numberEuro(list.amount)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportOverview;