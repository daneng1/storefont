import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import categoryReducer from './categories.js';
import productReducer from './products.js';
import cartReducer from './cart.js';

let reducers = combineReducers({ categoryReducer, productReducer, cartReducer });
const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();