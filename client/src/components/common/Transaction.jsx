import React, { useState, useContext, useCallback } from 'react';
import { useSpring, config, animated } from 'react-spring';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

const Transaction = ({ transaction, date }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showMenu, setshowMenu] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const formatDate = (date) => moment(date).format('D MMM, YYYY');
  const sign =
    transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';

  const buttonWidth = 70,
        paddingLeft = 15,
        totalWidth = buttonWidth * 2,
        travelY = paddingLeft + totalWidth;

  const menuBlock = {
    position: 'absolute',
    left: `-${travelY}px`,
    width: totalWidth,
    height: '100%',
  };

  const menuBtn = {
    width: buttonWidth,
    height: '100%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
  };

  const deleteBtn = { background: '#f8777d', ...menuBtn };
  const editBtn = { background: '#232c2d9f', ...menuBtn };

  const props = useSpring({
    opacity: deleted ? 0 : 1,
    transform: 
      showMenu ? `translate3d(${travelY}px, 0, 0)` : 
      deleted ? 'translate3d(-2000px,0,0)' : 'translate3d(0px,0,0)',
    config: config.stiff,
    cursor: 'pointer',
  });

  const handleShowMenu = useCallback(() => {
    setshowMenu(!showMenu);
  }, [showMenu]);

  const handleDelete = useCallback(
    (id) => (event) => {
      deleteTransaction(id);
      setDeleted(true);
    },
    [deleteTransaction]
  );

  return (
    <animated.li style={props} onClick={handleShowMenu}>
      <div style={menuBlock}>
        <div style={deleteBtn} onClick={handleDelete(transaction._id)}>
          <DeleteSharpIcon className='menu-icon' />
        </div>
        <div style={editBtn}>
          <EditSharpIcon className='menu-icon' />
        </div>
      </div>

      <div>
        <p>{transaction.text}</p>
        {date && <p className='list-date'>{formatDate(transaction.date)}</p>}
      </div>

      <span
        className={`list-amount ${
          transaction.amount === 0
            ? null
            : transaction.amount > 0
            ? 'plus'
            : 'minus'
        }`}
      >
        {sign}
        {numberEuro(Math.abs(transaction.amount))}
      </span>
    </animated.li>
  );
};

export default Transaction;