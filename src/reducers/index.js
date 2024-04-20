import { ActionTypes, initialStates } from "../actions/action";

const companyReducer = (state = initialStates.companyState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        data : action.payload
      }
    case ActionTypes.FETCH_COMPANY_FAILURE:
      return {
        ...state,
        error : action.payload
      }
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn : true
      }
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn : false
      }
    default:
      return state
  }
}

const productsReducer = (state = initialStates.productState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const cartReducer = (state = initialStates.cartState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case ActionTypes.COMPLETE_TRANSACTION:
      return {
        ...state,
        transactionComplete: true,
      };
    default:
      return state;
  }
};

const customersReducer = (state = initialStates.customerState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case ActionTypes.REMOVE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const authReducer = (state = initialStates.authState, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
};

const usersReducer = (state = initialStates.userState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case ActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

const receiptsReducer = (state = initialStates.receiptState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_RECEIPT:
      return {
        ...state,
        receipts: [...state.receipts, action.payload],
      };
    default:
      return state;
  }
};

export {
  productsReducer,
  cartReducer,
  customersReducer,
  authReducer,
  usersReducer,
  receiptsReducer,
  companyReducer
};
