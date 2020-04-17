import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
// import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const Transaction = ({ transaction, date, deleteButton }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = (amount) => (amount === 0 ? null : amount < 0 ? '-' : '+');
  const sunday = (weekNum) => moment().day(0).week(weekNum).format('D');
  const saturday = (weekNum) => moment().day(6).week(weekNum).format('D MMM');
  const formatWeek = (weekNum) => `${sunday(weekNum)} - ${saturday(weekNum)}`;

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
            transaction.amount === 0
              ? null
              : transaction.amount > 0
              ? 'plus'
              : 'minus'
          }`}
        >
          {sign(transaction.amount)}
          {numberEuro(Math.abs(transaction.amount))}
        </span>
      ) : (
        <div
          className='list-amount'
          style={{ width: '300px', textAlign: 'right' }}
        >
          <span className='plus block'>
            {transaction.income === 0
              ? '-'
              : sign(transaction.income) +
                numberEuro(Math.abs(transaction.income))}
          </span>
          <span className='minus block expense-amount'>
            {transaction.expense === 0
              ? '-'
              : sign(transaction.expense) +
                numberEuro(Math.abs(transaction.expense))}
          </span>
        </div>
      )}
    </li>
  );
};

export default Transaction;
