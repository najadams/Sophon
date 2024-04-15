import { ActionTypes, initialStates } from "../actions/action";

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
    default:
      return state;
  }
};

const transactionsReducer = (state = initialStates.transactionState, action) => {
  switch (action.type) {
    case ActionTypes.COMPLETE_TRANSACTION:
      return [...state, action.payload];
    default:
      return state;
  }
};

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

export {productsReducer, cartReducer, transactionsReducer, authReducer, usersReducer, receiptsReducer}