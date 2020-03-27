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
      return {
        ...state,
        users: action.payload,
      }

    case 'AUTH_USER':
      return {
        ...state,
        users: action.payload,
      }

    case 'GET_USER':
      return {
        ...state,
        loading: false,
        users: action.payload,
      }

    default:
      return state;
  }
};
