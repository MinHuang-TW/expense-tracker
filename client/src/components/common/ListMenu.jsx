import React, { useState, useContext, useCallback } from 'react';
import { useSpring, config, animated } from 'react-spring';
import { GlobalContext } from '../../context/GlobalState';
import { numberEuro } from '../../utils/format';
import TransactionForm from './TransactionForm';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

const ListMenu = ({ data, date }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showMenu, setshowMenu] = useState(false),
        [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const sign = !data.amount ? null : data.amount > 0 ? '+' : '-',
        color = !data.amount ? 'zero' : data.amount > 0 ? 'plus' : 'minus';
  const formatDate = (date) => moment(date).format('D MMM, YYYY'),
        formatRelative = (date) => moment(date).fromNow();

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

  const props = useSpring({
    opacity: deleted ? 0 : 1,
    transform: showMenu
      ? `translate3d(${travelY}px, 0, 0)`
      : deleted
      ? 'translate3d(-2000px,0,0)'
      : 'translate3d(0px,0,0)',
    config: config.stiff,
    cursor: 'pointer',
  });

  const handleShowMenu = useCallback(() => {
    setshowMenu(!showMenu);
  }, [showMenu]);

  const handleShowForm = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDelete = useCallback((id) => (event) => {
    deleteTransaction(id);
    setDeleted(true);
  }, [deleteTransaction]);

  return (
    <>
      <animated.li style={props} onClick={handleShowMenu}>
        <div style={menuBlock}>
          <div className='minus-bg' style={menuBtn} onClick={handleDelete(data._id)}>
            <DeleteSharpIcon className='menu-icon' />
          </div>
          <div className='zero-bg' style={menuBtn} onClick={handleShowForm}>
            <EditSharpIcon className='menu-icon' />
          </div>
        </div>

        <div>
          <p>{data.text}</p>
          {date && (
            <p className='list-date'>
              {date === 'relative' ? formatRelative(data.date) : formatDate(data.date)}
            </p>
          )}
        </div>

        <span className={`list-amount ${color}`}>
          {sign}{numberEuro(Math.abs(data.amount))}
        </span>
      </animated.li>

      <TransactionForm data={data} open={open} setOpen={setOpen} action='edit' />
    </>
  );
};

export default ListMenu;