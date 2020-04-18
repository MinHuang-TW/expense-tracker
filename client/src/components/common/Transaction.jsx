import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
// import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const Transaction = ({ transaction, date, deleteButton }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';

  const sunday = (weekNum) => moment().day(0).week(weekNum).format('D');
  const saturday = (weekNum) => moment().day(6).week(weekNum).format('D MMM');
  const formatWeek = (weekNum) => `${sunday(weekNum)} - ${saturday(weekNum)}`;

  const formatAmount = (amount) => Math.abs(amount.toFixed(2));
  const income = formatAmount(transaction.income);
  const expense = formatAmount(transaction.expense);
  const amounts = [
    { name: income, sign: '+' },
    { name: expense, sign: '-' },
  ];

  return (
    <li>
      {deleteButton && (
        <DeleteSharpIcon
          className='delete-btn'
          style={{ fontSize: '20px' }}
          onClick={() => deleteTransaction(transaction._id)}
        />
      )}

      <div style={{ marginLeft: deleteButton ? '35px' : 0, minWidth: '80px' }}>
        <p>{transaction.text}</p>
        {transaction.text.startsWith('Week') && (
          <p className='list-date' style={{ fontSize: '12px' }}>
            {formatWeek(transaction.index)}
          </p>
        )}
        {date && (
          <p className='list-date'>
            {moment(transaction.date).format('D MMM, YYYY')}
          </p>
        )}
      </div>

      {transaction.amount ? (
        <span
          className={`list-amount ${
            transaction.amount === 0 ? null 
              : transaction.amount > 0 ? 'plus' : 'minus'
          }`}
        >
          {sign}
          {numberEuro(Math.abs(transaction.amount))}
        </span>
      ) : (
        <div className='list-amount block-amount'>
          {amounts.map(({ name, sign }, index) => (
            <span
              key={name + index}
              className={`block ${
                name === income ? 'plus' : 'minus expense-amount'
              }`}
            >
              {name === 0 ? '-' : sign + numberEuro(name)}
            </span>
          ))}
        </div>
      )}
    </li>
  );
};

export default Transaction;
