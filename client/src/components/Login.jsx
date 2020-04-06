import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom' ;
import { GlobalContext } from '../context/GlobalState';
import PasswordIcon from '../components/common/PasswordIcon';
import { TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    width: '100%',
    textTransform: 'Uppercase',
    textAlign: 'left',
  },
  input: {
    margin: '15px auto',
    width: '100%',
  },
  button: {
    marginTop: '30px',
    textTransform: 'Uppercase',
  },
  link: {
    display: 'inline',
    cursor: 'pointer',
    marginLeft: '10px',
    textTransform: 'Uppercase',
    fontWeight: 600,
  }
}));

const Login = () => {
  const { getToken, registerUser, loginUser, error } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowpassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  // const [disableBtn, setDisableBtn] = useState(true);

  const classes = useStyles();

  const SubmitButton = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`btn plus-bg ${classes.button}`}
        // disabled={disableBtn ? true : false}
      >
        { children }
      </button>
    )
  }

  const ModeSwitch = ({ mode, children }) => {
    return (
      <div style={{ marginTop: '30px' }}>
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

  const handleRegister = e => {
    e.preventDefault();
    const newUser = { name, email, password };
    registerUser(newUser);
  };

  const handleLogin = e => {
    e.preventDefault();
    loginUser({ email, password });
  };

  if (getToken()) return <Redirect to='/' />

  return (
    <form className='container login-form' noValidate autoComplete='off'>

      {error && (
        <Alert variant='outlined' severity='error' className={classes.alert}>
          {error.replace(/"/g, "")}
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
          <SubmitButton onClick={e => handleRegister(e)}>Sign up</SubmitButton>
          <ModeSwitch mode='Login'>Already have account?</ModeSwitch>
        </>
      ) : (
        <>
          <SubmitButton onClick={e => handleLogin(e)}>Login</SubmitButton>
          <ModeSwitch mode='Sign up'>No account?</ModeSwitch>
        </>
      )}
    </form>
  );
};

export default Login;
