import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberEuro } from '../utils/format';
import moment from 'moment';
// import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

const Transaction = ({ transaction, date, deleteButton }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';

  return (
    <li>
      {deleteButton &&
        <DeleteSharpIcon
          className='delete-btn'
          style={{ fontSize: '20px' }} 
          onClick={() => deleteTransaction(transaction._id)}
        />}

      <div style={{ marginLeft: deleteButton ? '35px' : 0 }}>
        <p>{transaction.text}</p>
        {date && <p className='list-date'>
          {moment(transaction.date).format('D MMM, YYYY')}
        </p>}
      </div> 

      <span 
        className={`list-amount ${transaction.amount === 0 
          ? null : transaction.amount > 0 
          ? 'plus' : 'minus'}`}
      >
        {sign}{numberEuro(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default Transaction;
