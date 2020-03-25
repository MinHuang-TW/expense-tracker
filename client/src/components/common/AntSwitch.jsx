import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 50,
    height: 30,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(20px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 26,
    height: 26,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 30 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main
  },
  checked: {}
}))(Switch);

const AntSwitch = props => {
  return (
    <AntSwitch
      tabIndex='-1'
      checked={minus}
      onChange={() => setMinus(!minus)}
    />
  );
};

export default AntSwitch;
