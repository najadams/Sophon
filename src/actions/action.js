export const FETCH_INVENTORY_REQUEST = "FETCH_INVENTORY_REQUEST";
export const FETCH_INVENTORY_SUCCESS = "FETCH_INVENTORY_SUCCESS";
export const FETCH_INVENTORY_FAILURE = "FETCH_INVENTORY_FAILURE";

export const ActionTypes = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  COMPLETE_TRANSACTION: "COMPLETE_TRANSACTION",

  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  ADD_RECEIPT: "ADD_RECEIPT",

  SET_AUTH_TOKEN: "SET_AUTH_TOKEN",
};

export const FETCH_ADMIN_REQUEST = "FETCH_ADMIN_REQUEST";
export const FETCH_ADMIN_SUCCESS = "FETCH_ADMIN_SUCCESS";
export const FETCH_ADMIN_FAILURE = "FETCH_ADMIN_FAILURE";

export const fetchInventoryRequest = () => ({ type: FETCH_INVENTORY_REQUEST });
export const fetchInventorySuccess = (inventory) => ({ type: FETCH_INVENTORY_SUCCESS, payload : inventory });
export const fetchInventoryFailure = (error) => ({ type: FETCH_INVENTORY_FAILURE, payload: error });

export const fetchAdminRequest = () => ({ type: FETCH_ADMIN_REQUEST });
export const fetchAdminSuccess = (admin) => ({ type: FETCH_ADMIN_SUCCESS, payload : admin });
export const fetchAdminFailure = (error) => ({ type: FETCH_ADMIN_FAILURE, payload: error });

// export const makeInCharge = ()


export const initialStates = {
  productState: {
    products: [], // List of products
    isLoading: false, // Loading state for products
    error: null, // Error state for products
  },
  cartState: {
    cart: [], // List of products in the cart
    transactionComplete: false, // Transaction status
    isLoading: false, // Loading state for cart
    error: null, // Error state for cart
  },
  userState: {
    users: [], // List of users
    currentUser: null, // Current logged in user
    isLoading: false, // Loading state for users
    error: null, // Error state for users
  },
  receiptState: {
    receipts: [], // List of receipts
    isLoading: false, // Loading state for receipts
    error: null, // Error state for receipts
  },
  authState: {
    authToken: null, // Authentication token
    isLoading: false, // Loading state for authentication
    error: null, // Error state for authentication
  },
  transactionState: {
    isCompleted : false
  }
};



// Action Creators
export const ActionCreators = {
  addProduct: (product) => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: product,
  }),
  removeProduct: (productId) => ({
    type: ActionTypes.REMOVE_PRODUCT,
    payload: productId,
  }),
  addToCart: (item) => ({
    type: ActionTypes.ADD_TO_CART,
    payload: item,
  }),
  removeFromCart: (itemId) => ({
    type: ActionTypes.REMOVE_FROM_CART,
    payload: itemId,
  }),
  completeTransaction: (transaction) => ({
    type: ActionTypes.COMPLETE_TRANSACTION,
    payload: transaction,
  }),
  addUser: (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user,
  }),
  removeUser: (userId) => ({
    type: ActionTypes.REMOVE_USER,
    payload: userId,
  }),
  setCurrentUser: (user) => ({
    type: ActionTypes.SET_CURRENT_USER,
    payload: user,
  }),
  addReceipt: (receipt) => ({
    type: ActionTypes.ADD_RECEIPT,
    payload: receipt,
  }),
  setAuthToken: (token) => ({
    type: ActionTypes.SET_AUTH_TOKEN,
    payload: token,
  }),
};
