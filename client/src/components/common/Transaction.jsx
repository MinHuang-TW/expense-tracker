import React, { useState, useContext, useCallback } from 'react';
import { useSpring, config, animated } from 'react-spring';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

const Transaction = ({ transaction, date }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showMenu, setshowMenu] = useState(false);

  const formatDate = (date) => moment(date).format('D MMM, YYYY');
  const sign =
    transaction.amount === 0 ? null : transaction.amount < 0 ? '-' : '+';

  const buttonWidth = 70,
        paddingLeft = 15;

  const menuBtn = {
    position: 'absolute',
    width: buttonWidth,
    height: '100%',
    cursor: 'pointer',
  };

  const deleteBtn = {
    background: '#f8777d',
    left: `-${paddingLeft + buttonWidth}px`,
    ...menuBtn,
  };

  // const editBtn = {
  //   background: '#232c2d9f',
  //   left: `-${paddingLeft + buttonWidth}px`,
  //   ...menuBtn,
  // }

  const props = useSpring({
    transform: showMenu
      ? `translate3d(${paddingLeft + buttonWidth}px, 0, 0)`
      : 'translate3d(0px,0,0)',
    cursor: 'pointer',
    config: config.stiff,
  });

  const handleShowMenu = useCallback(() => {
    setshowMenu(!showMenu);
  }, [showMenu]);

  const handleDelete = useCallback(
    (id) => (event) => {
      deleteTransaction(id);
    },
    [deleteTransaction]
  );

  return (
    <animated.li style={props} onClick={handleShowMenu}>
      <>
        <div style={deleteBtn} onClick={handleDelete(transaction._id)}>
          <DeleteSharpIcon className='menu-icon' />
        </div>
        {/* <div style={editBtn}>
          <EditSharpIcon className='menu-icon' />
        </div> */}
      </>

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
