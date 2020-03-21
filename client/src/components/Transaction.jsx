import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import DeleteIcon from '@material-ui/icons/Delete';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign} $ {numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <div
        className='delete-btn'
        onClick={() => deleteTransaction(transaction._id)}
      >
        <DeleteIcon />
      </div>
    </li>
  );
};

export default Transaction;
