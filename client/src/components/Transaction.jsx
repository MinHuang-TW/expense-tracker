import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas, formatDate } from '../utils/format';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li>
      <BackspaceSharpIcon
        className='delete-btn'
        style={{ fontSize: '20px' }} 
        onClick={() => deleteTransaction(transaction._id)}
      />
      <div style={{ marginLeft: '35px' }}>
        <p>{transaction.text}</p>
        <p className='list-date'>
          {formatDate(transaction.date)}
        </p>
      </div> 
      <span className={`list-amount ${transaction.amount > 0 ? 'plus' : 'minus'}`}>
        {sign} {numberWithCommas(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default Transaction;
