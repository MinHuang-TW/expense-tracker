import React from 'react';
import Total from './Total';
import PieChart from './PieChart';
import IncomeExpenses from './IncomeExpenses';
import { amountCalc } from '../../utils/format';

const ReportOverview = ({ selected, timeFilters, value, amounts }) => {
  const { income, expense } = amountCalc(amounts);
  const noData = income === 0.00 & expense === 0.00;
  const ratio = income > expense ? (expense / income * 100).toFixed(0) : 100;
  const data = [ratio, 100 - ratio];

  const width = 120, 
        height = 120;
  const outerRadius = width / 2,
        innerRadius = outerRadius - 6;

  return (
    <div className='plus-bg box'>
      {selected === 'all' ? (
        <div className='box-balance'>
          <Total 
            text={`${timeFilters[value]}ly balance`} 
            amounts={amounts} 
          />
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
            <IncomeExpenses 
              amounts={amounts} 
              titleClass='text-white-s' 
              blockStyle={{ margin: '10px 0'}} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportOverview;