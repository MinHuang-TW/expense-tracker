import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const { addUser, getUser, authUser } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      id: Math.floor(Math.random() * 100000000),
      name,
      email,
      password,
    };
    // addUser(newUser);
    authUser(newUser);
    // console.log(newUser);
    
    setName('');
    setEmail('');
    setPassword('');

    // redirect to dashboard
  };

  return ( 
    <form 
      onSubmit={e => handleSubmit(e)}
      style={{ width: '80vw', margin: '100px auto', textAlign: 'center' }}
      noValidate autoComplete="off"
    >

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
        style={{ marginTop: '50px', width: '100%', height: '30px' }}
      >
        SAVE
      </button>
    </form>
  );
}

export default Login;