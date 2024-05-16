import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import storage
import {thunk} from "redux-thunk"; 
import { combineReducers } from "redux";
import {
  cartReducer,
  customersReducer,
  productsReducer,
  usersReducer,
  receiptsReducer,
  companyReducer,
} from "../reducers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  company: companyReducer,
  products: productsReducer,
  cart: cartReducer,
  workeers: usersReducer,
  receipts: receiptsReducer,
  customers: customersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)) // Add a missing comma here
);

export default store;
export const persistor = persistStore(store)