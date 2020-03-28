import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  users: [],
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');
      // console.log(res)
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addUser(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', config);
      dispatch({
        type: 'REGISTER_USER',
        payload: res.data
      });
      // localStorage.setItem('token', res.data.token);
      // console.log(res.data.token);
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function authUser(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth', user, config);
      dispatch({
        type: 'AUTH_USER',
        payload: res.data
      });
      // console.log(res.data.token);
      // config.headers['x-auth-token'] = res.data.token;
      // localStorage.setItem('token', res.data.token);
      // console.log(config);
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getUser(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };
    const token = state.token;
    // console.log(state.token)
    if (state.token) {
      config.headers["x-auth-token"] = state.token;
    }
    console.log(config.headers)

    try {
      const res = await axios.get('/api/auth/user', config);
      dispatch({
        type: 'GET_USER',
        payload: res.data.user
      });
      // console.log(res.data)
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        users: state.users,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        addUser,
        authUser,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
