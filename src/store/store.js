import { createStore, applyMiddleware } from "redux";
import { inventoryReducer } from "../reducers/inventoryReducers";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import { cartReducer, productsReducer, transactionsReducer, usersReducer, receiptsReducer } from "../reducers";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  products: productsReducer,
  cart: cartReducer,
  transactions: transactionsReducer,
  users: usersReducer,
  receipts: receiptsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store