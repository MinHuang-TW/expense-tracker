import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
  users: [],
  transactions: [],
  token: null,
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');

  async function getTransactions() {
    try {
      const res = await axios.get('/api/transactions');
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
      await axios.delete(`/api/transactions/${id}`);
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
      const res = await axios.post('/api/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        // err.response.status: 400
        // err.response.data: { success: false, error: '...' }
        payload: err.response.data.error
      });
    }
  }

  async function registerUser(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      const res = await axios.post('/api/users', user, config);
      dispatch({
        type: 'REGISTER_USER',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response
      });
    }
  }

  async function loginUser(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      const res = await axios.post('/api/auth', user, config);
      dispatch({
        type: 'LOGIN_USER',
        // res.data = { success: , token: , user: { id: , name: , email: }}
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data
      });
    }
  }

  async function loadUser(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };
    // const token = state.token;
    // console.log(state.token)
    // if (state.token) {
    //   config.headers["x-auth-token"] = state.token;
    // }
    // console.log(config.headers)

    try {
      const res = await axios.get('/api/users', user, config);
      dispatch({
        type: 'LOAD_USER',
        payload: res.data.user
      });
      // console.log(res.data)
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response
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
        registerUser,
        loginUser,
        loadUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
