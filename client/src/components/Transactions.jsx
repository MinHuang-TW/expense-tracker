import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { filterDate, filterAmount, sortDateAmount } from '../utils/calculation';
import NewTabs from './common/NewTabs';
import ReportOverview from './common/ReportOverview';
import ListMenu from './common/ListMenu';
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

const Transactions = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const timeFilters = ['day', 'week', 'month', 'year'],
        [value, setValue] = useState(0);
  const transFilters = ['all', 'income', 'expense'],
        [selected, setSelected] = useState('all');
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);
  const amounts = [];

  const lists = transactions
    .filter(({ date }) => filterDate(date, value, timeFilters))
    .filter(({ amount }) => {
      amounts.push(amount);
      return filterAmount(amount, selected);
    })
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(lists, list => list._id, {
    from: { height: 86, transform: 'translate3d(-5%,0,0)', opacity: 0 },
    enter: { height: 86, transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { height: 0, transform: 'translate3d(-5000%,0,0)', opacity: 0, delay: 0 },
    // leave: { height: 0, opacity: 0, delay: 0 },
    config: config.stiff,
    reset: true,
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
    resetTransaction();
    getTransactions();
    // eslint-disable-next-line
  }, []);

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
          <ul className='list' style={{ marginBottom: 20 }}>
            {transition.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <ListMenu data={item} date />
              </animated.div>
            ))}
          </ul>
        ) : (
          <div className='list-status'>
            {loading 
              ? (<CircularProgress color='primary' />)
              : (<p>No {selected !== 'all' && selected} transaction</p>)
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Transactions;