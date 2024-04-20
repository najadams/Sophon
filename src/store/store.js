import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import { cartReducer,customersReducer, productsReducer, usersReducer, receiptsReducer, companyReducer } from "../reducers";

const rootReducer = combineReducers({
  company : companyReducer, 
  products: productsReducer,
  cart: cartReducer,
  workers: usersReducer,
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