import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import jwt from 'jwt-decode';
import { createBrowserHistory } from 'history';
import App from './App';
import store from './features';
import { logout } from './features/auth';

import 'react-toastify/dist/ReactToastify.css';

const history = createBrowserHistory();
const now = new Date();
const exp = localStorage.getItem('access_token')
  ? jwt(JSON.parse(localStorage.getItem('access_token')))?.exp
  : null;

/** Check token expiration */
console.log(`${exp * 1000}, ${now.getTime()}`);
if (exp * 1000 < now.getTime()) {
  console.log("Token expired.");

  store.dispatch(logout(history));
}

ReactDOM.render(
  <Provider store={store}>
    <App />    
    <ToastContainer />
  </Provider>,
  document.getElementById('root')
);
