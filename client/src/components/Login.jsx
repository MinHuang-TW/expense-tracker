import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const { registerUser, loginUser, error } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      className="new-form" 
      style={{ margin: '100px auto' }}
      noValidate autoComplete="off"
    >
      {error && <p>{error}</p>}
      <TextField
        id="standard-full-width"
        label="Acount" fullWidth required autoFocus
        value={name}
        onChange={e => {setName(e.target.value)}}
      />

      <TextField
        id="standard-full-width"
        label="email" fullWidth required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        id="standard-full-width"
        label="password" fullWidth required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button 
        onClick={e => handleRegister(e)} 
        className='btn plus-bg'
        style={{ marginTop: '50px' }}
      >
        Sign up
      </button>

      <button 
        onClick={e => handleLogin(e)} 
        className='btn plus-bg'
      >
        Log in
      </button>

    </form>
  );
}

export default Login;