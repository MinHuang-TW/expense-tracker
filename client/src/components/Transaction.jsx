import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas, formatDate } from '../utils/format';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        <BackspaceSharpIcon
          className='delete-btn'
          style={{ fontSize: '20px' }} 
          onClick={() => deleteTransaction(transaction._id)}
        />
      <div style={{ marginLeft: '35px' }}>
        <p>{transaction.text}</p>
        <p style={{ 
          opacity: 0.3, 
          fontSize: '14px', 
          marginTop: '3px',
          letterSpacing: '1px' 
        }}>
          {formatDate(transaction.date)}
        </p>
      </div> 
      <span style={{
        fontSize: '20px',
        color: transaction.amount > 0 ? '#00c853' : '#f44336',
      }}>
        {sign} {numberWithCommas(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default Transaction;
