import React, { useState, useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro, formatAmount } from '../../utils/format';
import { getWeekDate } from '../../utils/calculation';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
// import EditSharpIcon from '@material-ui/icons/EditSharp';

const Transaction = ({ transaction, date, menu }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showMenu, setshowMenu] = useState(false);
  const sign = transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';
  const income = formatAmount(transaction.income);
  const expense = formatAmount(transaction.expense);
  const amounts = [{ type: income, sign: '+' }, { type: expense, sign: '-' }];
  const buttonWidth = 70, paddingLeft = 15;

  const listBlock = {
    cursor: menu && 'pointer',
    transform: menu && showMenu 
      ? `translateX(${paddingLeft + buttonWidth}px)` 
      : 'translateX(0)',
    transition: 'transform .3s ease',
  };

  const menuBtn = {
    position: 'absolute',
    width: buttonWidth,
    height: '100%',
    cursor: 'pointer',
  }

  const deleteBtn = {
    background: '#f8777d',
    left: `-${paddingLeft + buttonWidth}px`,
    ...menuBtn,
  }
  
  // const editBtn = {
  //   background: '#232c2d9f',
  //   left: `-${paddingLeft + buttonWidth}px`,
  //   ...menuBtn,
  // }
  
  const listText = { minWidth: '80px' };
  const listSubText = { fontSize: '12px' };

  const handleShowMenu = useCallback(() => {
    setshowMenu(!showMenu);
  }, [showMenu])

  return (
    <li style={listBlock} onClick={handleShowMenu}>
      {menu && (
        <>
          <div 
            style={deleteBtn} 
            onClick={() => deleteTransaction(transaction._id)}
          >
            <DeleteSharpIcon className='menu-icon' />
          </div>
          {/* <div style={editBtn}>
            <EditSharpIcon className='menu-icon' />
          </div> */}
        </>
      )}

      <div style={listText}>
        <p>{transaction.text}</p>
        {transaction.text.startsWith('Week') && (
          <p className='list-date' style={listSubText}>
            {getWeekDate(transaction.index)}
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
          {sign}{numberEuro(Math.abs(transaction.amount))}
        </span>
      ) : (
        <div className='list-amount block-amount'>
          {amounts.map(({ type, sign }, index) => (
            <span
              key={type + index}
              className={`block ${type === income ? 'plus' : 'minus expense-amount'}`}
            >
              {type === 0 ? '-' : sign + numberEuro(type)}
            </span>
          ))}
        </div>
      )}
    </li>
  );
};

export default Transaction;
