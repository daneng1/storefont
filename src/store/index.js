import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import categoryReducer from './categories.js';
import productReducer from './products.js';
import cartReducer from './cart.js';

let reducers = combineReducers({ categoryReducer, productReducer, cartReducer });
const store = () => {
  return createStore(reducers, composeWithDevTools());
}

export default store();