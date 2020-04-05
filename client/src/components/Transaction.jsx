import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberEuro, formatDate } from '../utils/format';
// import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

const Transaction = ({ transaction, date }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount === 0 ? null : transaction.amount < 0 ?'-' : '+';

  return (
    <li>
      <DeleteSharpIcon
        className='delete-btn'
        style={{ fontSize: '20px' }} 
        onClick={() => deleteTransaction(transaction._id)}
      />
      <div style={{ marginLeft: '35px' }}>
        <p>{transaction.text}</p>
        {date && <p className='list-date'>
          {formatDate(transaction.date)}
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
