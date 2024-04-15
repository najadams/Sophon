import { ActionCreators, ActionTypes, initialStates } from "../actions/action";

const productsReducer = (state = initialStates.productState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return [...state, action.payload];
    case ActionTypes.REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
};

const cartReducer = (state = initialStates.cartState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return [...state, action.payload];
    case ActionTypes.REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case ActionTypes.COMPLETE_TRANSACTION:
      return {
        ...state,
        transactionCompleted : true
      };
    default:
      return state;
  }
};

const customersReducer = (state = initialStates.customerState, action) => {
  switch (action.type) {
    case ActionCreators.addCustomer:
      return [...state, action.payload];
    case ActionTypes.REMOVE_PRODUCT:
      return state.filter((customer) => customer.id !== action.payload);
    default:
      return state;
  }
}

const authReducer = (state = initialStates.authState, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authorization: action.payload,
      };
    default:
      return state;
  }
};


const usersReducer = (state = initialStates.userState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return [...state, action.payload];
    case ActionTypes.REMOVE_USER:
      return state.filter((user) => user.id !== action.payload);
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users : [...action.payload]
      };
    case ActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error : action.payload
      };
    case ActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading : true
      };
    case ActionTypes.SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

const receiptsReducer = (state = initialStates.receiptState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_RECEIPT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export {productsReducer, cartReducer,customersReducer, authReducer, usersReducer, receiptsReducer}