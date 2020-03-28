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
      localStorage.setItem('token', action.payload.token);
      // console.log(action.payload.token);
      return {
        ...state,
        users: action.payload,
      }

    case 'AUTH_USER':
      localStorage.setItem('token', action.payload.token);
      // console.log(action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        users: action.payload,
      }

    case 'GET_USER':
      const token = localStorage.getItem('token');
      return {
        ...state,
        token,
        isAuthenticated: true,
        loading: false,
        users: action.payload,
      }

    case 'LOGOUT':
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        users: null,
        isAuthenticated: false,
        loading: false,
      }

    default:
      return state;
  }
};
