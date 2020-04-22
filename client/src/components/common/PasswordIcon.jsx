import React from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordIcon = ({ showPassword, setShowpassword }) => (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={setShowpassword}
        onMouseDown={setShowpassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

export default PasswordIcon;
