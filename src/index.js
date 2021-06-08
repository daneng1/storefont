import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js'
import App from './app';
import './components/style/reset.css';

function Entry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<Entry />, root);
