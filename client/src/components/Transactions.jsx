import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { GlobalContext } from '../context/GlobalState';
import { filterAmount, sortDateAmount } from '../utils/calculation';
import { transitionConfig } from '../utils/animation';
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
  const { loading, transactions, getTransaction, resetTransaction } = useContext(GlobalContext);
  const timeFilters = ['day', 'week', 'month', 'year'],
        [value, setValue] = useState(0);
  const transFilters = ['all', 'income', 'expense'],
        [selected, setSelected] = useState('all');
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);

  const lists = transactions
    .filter(({ amount }) => filterAmount(amount, selected))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(
    lists, 
    list => list._id, 
    transitionConfig(86, 100),
  );
  
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
        amounts={transactions.map(({ amount }) => amount)}
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
          <ul className='list list-bottom'>
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