import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { InputAdornment, TextField, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    margin: '15px auto',
  },
  button: {
    marginTop: '30px',
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

  const classes = useStyles();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };
    await registerUser(newUser);
    if (error) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await loginUser({ email, password });
    if (error) {
      setEmail('');
      setPassword('');
    }
  }

  return ( 
    <form
      className="container" 
      style={{ textAlign: 'center', marginTop: '100px' }}
      noValidate autoComplete="off"
    >
      {error && <Alert severity="error" className={classes.root}>{error}</Alert>}
      {showSignup && <TextField
        label="Name" fullWidth required autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        className={classes.input}
      />}

      <TextField
        label="Email" type="email" fullWidth required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={classes.input}
      />

      <TextField
        label="Password" fullWidth required
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={classes.input}
        InputProps={{
          endAdornment:
            (<InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowpassword(!showPassword)}
                onMouseDown={() => setShowpassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>)
        }}
      />

      {showSignup 
        ? <>
            <button 
              onClick={e => handleRegister(e)} 
              className={`btn plus-bg ${classes.button}`}
              // disabled={disableBtn ? true : false}
            >
              Sign up
            </button>
            <div className={classes.button}>
              Do not have an account?
              <b 
                onClick={() => setShowSignup(!showSignup)} 
                className='plus'
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                Login
              </b>
            </div>
          </>
        : <>
            <button 
              onClick={e => handleLogin(e)} 
              className={`btn plus-bg ${classes.button}`}
              // disabled={disableBtn ? true : false}
            >
              Log in
            </button>
            <div className={classes.button}>
              Do not have an account?
              <b 
                onClick={() => setShowSignup(!showSignup)} 
                className='plus'
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                Signup
              </b>
            </div>
          </>
      }
    </form>
  );
}

export default Login;