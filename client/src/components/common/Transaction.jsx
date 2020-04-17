import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
// import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const Transaction = ({ transaction, date, deleteButton }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';
  const text = transaction.text.split('-');

  return (
    <li>
      {deleteButton &&
        <DeleteSharpIcon
          className='delete-btn'
          style={{ fontSize: '20px' }} 
          onClick={() => deleteTransaction(transaction._id)}
        />}

      <div style={{ marginLeft: deleteButton ? '35px' : 0, minWidth: '60px' }}>
        <p>{text[0]}</p>
        {text.length > 1 && <p>{'- ' + text[1]}</p>}
        {date && <p className='list-date'>
          {moment(transaction.date).format('D MMM, YYYY')}
        </p>}
      </div> 

      {transaction.amount
        ? <span 
            className={`list-amount ${transaction.amount === 0 
              ? null : transaction.amount > 0 
              ? 'plus' : 'minus'}`}
          >
            {sign}{numberEuro(Math.abs(transaction.amount))}
          </span>
        : <div className='list-amount' style={{ width: '300px', textAlign: 'right' }}>
            <span className='plus block'>
              {transaction.income === 0 ? '-' : '+' + numberEuro(transaction.income)}
            </span>
            <span className='minus block expense-amount'>
              {transaction.expense === 0 ? '-' : numberEuro(transaction.expense)}
            </span>
          </div>
      }
    </li>
  );
};

export default Transaction;
