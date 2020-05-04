import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { sortDateDsc, sortDateAsc, sortAmountDsc, sortAmountAsc } from '../utils/calculation';
import NewTabs from './common/NewTabs';
import ReportOverview from './common/ReportOverview';
import Transaction from './common/Transaction';
import Filter from './common/Filter';
import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import { whiteTheme } from '../utils/colorTheme.js';
import { ThemeProvider } from "@material-ui/styles";

const Selector = ({ types, selected, setSelected }) => {
  const style = {
    buttonGroup : { 
      background: '#65BCBF', 
      borderRadius: 0 
    },
    button: { 
      borderRadius: 0, 
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
  };

  const handleSelect = useCallback((type) => (event) => {
    setSelected(type);
  }, [setSelected]);

  return (
    <ThemeProvider theme={whiteTheme}>
      <ButtonGroup
        color='primary'
        style={style.buttonGroup}
        aria-label='selectors'
        fullWidth disableRipple
      >
        {types.map(type => (
          <Button
            key={type}
            variant={selected === type ? 'contained' : null}
            color={selected === type ? 'primary' : 'secondary'}
            onClick={handleSelect(type)}
            style={style.button}
            disableElevation disableFocusRipple disableRipple
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    </ThemeProvider>
  );
};

const Report = () => {
  const { loading, transactions, getTransaction } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState('all');
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);
  const timeFilters = ['day', 'week', 'month', 'year'];
  const transFilters = ['all', 'income', 'expense'];
  const amounts = transactions.map(transaction => transaction.amount);

  const sortDateAmount = (a, b) => {
    if (sortColumn === 'date') {
      return sortLatest 
        ? sortDateDsc(a, b) 
        : sortDateAsc(a, b);
    }
    return sortDsc 
      ? sortAmountDsc(a.amount, b.amount) 
      : sortAmountAsc(a.amount, b.amount);
  };

  const filterAmount = amount => {
    if (selected === 'income') return amount > 0;
    if (selected === 'expense') return amount < 0;
    return amount;
  };

  const lists = transactions
    .filter(({ amount }) => filterAmount(amount))
    .sort((a, b) => sortDateAmount(a, b));

  const transition = useTransition(lists, list => list._id, {
    from: { height: 86, transform: 'translate3d(-5%,0,0)', opacity: 0 },
    enter: { height: 86, transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { height: 0, opacity: 0, delay: 0 },
    trail: 100,
  });

  const handleSortDate = useCallback(() => {
    setSortLatest(!sortLatest); 
    setSortColum('date');
  }, [sortLatest]);

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc); 
    setSortColum('amount');
  }, [sortDsc]);

  useEffect(() => {
    getTransaction(timeFilters[value]);
    // eslint-disable-next-line
  }, [value]);

  return (
    <>
      <NewTabs 
        types={timeFilters} 
        value={value} 
        setValue={setValue} 
      />

      <ReportOverview 
        selected={selected} 
        timeFilters={timeFilters} 
        value={value} 
        amounts={amounts}
      />

      <Selector 
        types={transFilters} 
        selected={selected} 
        setSelected={setSelected} 
      />

      <div className='container'>
        <Filter
          value={value}
          text="today"
          sortLatest={sortLatest}
          sortDsc={sortDsc}
          handleSortDate={handleSortDate}
          handleSortAmount={handleSortAmount}
        />

        {lists.length > 0 ? (
          <ul className='list'>
            {transition.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <Transaction transaction={item} date />
              </animated.div>
            ))}
          </ul>
        ) : (
          <div className='list-status'>
            {loading 
              ? (<CircularProgress color='primary'/>)
              : (<p>No {selected !== 'all' && selected} transaction</p>)
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Report;