export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        )
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }

    case 'REGISTER_USER':
    case 'LOGIN_USER':
      localStorage.setItem('token', action.payload.token);
      window.location = '/';
      return {
        ...state,
        // users: { success: , token: , user: { id: , name: , email: }}
        users: action.payload,
      }

    case 'LOAD_USER':
      // const token = localStorage.getItem('token');
      return {
        ...state,
        loading: false,
        users: action.payload,
      }

    case 'LOGOUT_USER':
      localStorage.removeItem("token");
      window.location = '/register';
      return {
        ...state,
        users: null,
        loading: false,
      }

    default:
      return state;
  }
};
