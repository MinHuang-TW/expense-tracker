import React from 'react';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

const TransactionFilter = ({
  value,
  sortLatest,
  sortDsc,
  handleSortDate,
  handleSortAmount,
  text,
}) => {

  const sortItem = { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    cursor: 'pointer',
    textTransform: 'uppercase',
  }

  return (
    <div className='input-amount plus'>
      {value === 0 ? (
        <div style={sortItem}>
          <Typography variant='body2'>{text}</Typography>
        </div>
      ) : (
        <div style={sortItem} onClick={handleSortDate}>
          <Typography variant='body2'>sort by Date</Typography>
          {sortLatest ? <ArrowDropDownSharpIcon /> : <ArrowDropUpSharpIcon />}
        </div>
      )}
      <div style={sortItem} onClick={handleSortAmount}>
        <Typography variant='body2'>Amount</Typography>
        {sortDsc ? <ArrowDropDownSharpIcon /> : <ArrowDropUpSharpIcon />}
      </div>
    </div>
  );
};

export default TransactionFilter;
