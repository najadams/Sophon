import { createStore, applyMiddleware, compose } from "redux";
import { inventoryReducer } from "../reducers/inventoryReducers";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import { cartReducer,customersReducer, productsReducer, usersReducer, receiptsReducer } from "../reducers";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  products: productsReducer,
  cart: cartReducer,
  users: usersReducer,
  receipts: receiptsReducer,
  customers : customersReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store