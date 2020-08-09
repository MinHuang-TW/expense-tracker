import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import PasswordIcon from '../components/common/PasswordIcon';
import { TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  centerAlign: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100vh - 178px)',
    },
    height: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '100%',
    borderRadius: 0,
  },
  alert: {
    textAlign: 'left',
    '&::first-letter': {
      textTransform: 'Uppercase',
    },
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
  },
}));

const Login = () => {
  const { getToken, registerUser, loginUser, error } = useContext(GlobalContext);
  const [name, setName] = useState(''),
        [email, setEmail] = useState('test@mail.com'),
        [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const classes = useStyles();

  const SubmitButton = ({ children, onClick }) => (
    <button 
      onClick={onClick} 
      className={`btn plus-bg ${classes.button}`}
    >
      {children}
    </button>
  );

  const ModeSwitch = ({ mode, children }) => {
    const handleClick = useCallback(() => {
      setShowAlert(false);
      setShowSignup(!showSignup);
      setName('');
    }, []);

    return (
      <div style={{ marginTop: '30px' }}>
        <span style={{ color: '#232C2D', opacity: 0.8 }}>{children}</span>
        <Typography
          color='primary'
          className={classes.link}
          onClick={handleClick}
        >
          {mode}
        </Typography>
      </div>
    );
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const login = e.target.innerText === 'LOGIN';
      if (login) loginUser({ email, password });
      else registerUser({ name, email, password });
    },
    // eslint-disable-next-line
    [name, email, password]
  );

  useEffect(() => {
    if (error) setShowAlert(true);
  }, [error]);

  const handleChange = useCallback((e) => {
    // eslint-disable-next-line
    switch (e.target.id) {
      case 'Name':
        setName(e.target.value);
        break;
      case 'Email':
        setEmail(e.target.value);
        break;
      case 'Password':
        setPassword(e.target.value);
        break;
    }
  }, []);

  const handleAlert = useCallback(() => {
    setShowAlert(false);
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const icon = {
    endAdornment: (
      <PasswordIcon
        showPassword={showPassword}
        setShowpassword={handleShowPassword}
      />
    ),
  };

  if (getToken()) return <Redirect to='/' />;

  return (
    <div className={classes.centerAlign}>
      {showAlert ? (
        <Alert
          severity='error'
          className={classes.alertBox}
          onClose={handleAlert}
        >
          <p className={classes.alert}>{String(error).replace(/"/g, '')}</p>
        </Alert>
      ) : (
        <div style={{ height: 48 }} />
      )}

      <form className='new-form' noValidate autoComplete='off'>
        <TextField
          id={showSignup ? 'Name' : ' '}
          label={showSignup ? 'Name' : ' '}
          required={!showSignup ? false : true}
          disabled={showSignup ? false : true}
          value={name}
          onChange={handleChange}
          className={classes.input}
        />

        <TextField
          id='Email'
          label='Email'
          type='email'
          required
          value={email}
          onChange={handleChange}
          className={classes.input}
        />

        <TextField
          id='Password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChange}
          InputProps={icon}
          className={classes.input}
          required
        />

        {showSignup ? (
          <>
            <SubmitButton onClick={handleSubmit}>Sign up</SubmitButton>
            <ModeSwitch mode='Login'>Already have account?</ModeSwitch>
          </>
        ) : (
          <>
            <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            <ModeSwitch mode='Sign up'>No account?</ModeSwitch>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;