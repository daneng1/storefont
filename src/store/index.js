import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import categoryReducer from './categories.js';
import productReducer from './products.js';

let reducers = combineReducers({ categoryReducer, productReducer });
const store = () => {
  return createStore(reducers, composeWithDevTools());
}

export default store();