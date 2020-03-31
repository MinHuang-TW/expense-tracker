import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import PasswordIcon from '../components/common/PasswordIcon';
import { TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    width: '100%',
  },
  input: {
    margin: '15px auto',
    width: '100%',
  },
  button: {
    marginTop: '30px'
  },
  link: {
    display: 'inline',
    cursor: 'pointer',
    marginLeft: '10px'
  }
}));

const Login = () => {
  const { registerUser, loginUser, error } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowpassword] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const classes = useStyles();

  const ModeSwitch = ({ mode, children }) => {
    return (
      <div className={classes.button}>
        <span style={{ color: '#232C2D', opacity: 0.8 }}>
          { children }
        </span>
        <Typography
          color='primary'
          className={classes.link}
          onClick={() => setShowSignup(!showSignup)}
        >
          { mode }
        </Typography>
      </div>
    )
  }

  const handleRegister = async e => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    };
    await registerUser(newUser);
    if (error) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = async e => {
    e.preventDefault();

    await loginUser({ email, password });
    if (error) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form
      className='container login-form'
      noValidate
      autoComplete='off'
    >
      {error && (
        <Alert severity='error' className={classes.alert}>
          {error}
        </Alert>
      )}

      <TextField
        label={showSignup ? 'Name' : ' '}
        required={!showSignup? false : true}
        disabled={showSignup? false : true}
        value={name}
        onChange={e => setName(e.target.value)}
        className={classes.input}
      />

      <TextField
        label='Email'
        type='email'
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={classes.input}
      />

      <TextField
        label='Password'
        type={showPassword ? 'text' : 'password'}
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={classes.input}
        InputProps={{
          endAdornment: (
            <PasswordIcon
              showPassword={showPassword}
              setShowpassword={() => setShowpassword(!showPassword)}
            />
          )
        }}
      />

      {showSignup ? (
        <>
          <button
            onClick={e => handleRegister(e)}
            className={`btn plus-bg ${classes.button}`}
            // disabled={disableBtn ? true : false}
          >
            Sign up
          </button>
          <ModeSwitch mode='Login'>Already have an account?</ModeSwitch>
        </>
      ) : (
        <>
          <button
            onClick={e => handleLogin(e)}
            className={`btn plus-bg ${classes.button}`}
            // disabled={disableBtn ? true : false}
          >
            Log in
          </button>
          <ModeSwitch mode='Signup'>Do not have an account?</ModeSwitch>
        </>
      )}
    </form>
  );
};

export default Login;
