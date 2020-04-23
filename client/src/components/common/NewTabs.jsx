import React, { useCallback } from 'react';
import { Tabs, Tab } from '@material-ui/core';

const NewTabs = ({ types, value, setValue }) => {
  const handleSwitch = useCallback(
    (index) => (event) => {
      setValue(index);
    },
    [setValue]
  );

  return (
    <div className='plus-bg time-bar'>
      <Tabs value={value} variant='fullWidth' aria-label='tabs'>
        {types.map((type, index) => (
          <Tab
            key={type}
            label={type}
            onClick={handleSwitch(index)}
            disableFocusRipple
            disableRipple
          />
        ))}
      </Tabs>
    </div>
  );
};

export default NewTabs;
