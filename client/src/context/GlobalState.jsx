import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";
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

  const getToken = () => {
    return localStorage.getItem('token');
  }

  const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  }
  
  axios.defaults.headers.common["x-auth-token"] = getToken();

  async function getTransaction(query) {
    try {
      const res = await axios.get(`/api/transactions/${query}`);
      dispatch({
        type: 'GET_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data
      });
    }
  }
  
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
        payload: err.response.data
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

  function resetTransaction() {
    dispatch({
      type: 'RESET_TRANSACTION',
    })
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
        type: 'LOGIN_ERROR',
        payload: err.response.data
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
        type: 'LOGIN_ERROR',
        payload: err.response.data
      });
    }
  }

  async function loadUser(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.get('/api/users', user, config);
      dispatch({
        type: 'LOAD_USER',
        payload: res.data.user
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response
      });
    }
  }

  function logoutUser() {
    dispatch({
      type: 'LOGOUT_USER',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        transactions: state.transactions,
        users: state.users,
        error: state.error,
        loading: state.loading,
        getTransactions,
        getTransaction,
        deleteTransaction,
        addTransaction,
        resetTransaction,
        registerUser,
        loginUser,
        loadUser,
        logoutUser,
        getToken,
        getCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
