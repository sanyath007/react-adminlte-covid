import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import { logout } from '../features/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const now = new Date();
  const exp = localStorage.getItem('access_token')
    ? jwt(JSON.parse(localStorage.getItem('access_token')))?.exp
    : null;

  /** Check token expiration */
  let isExpired = false;
  isExpired = exp * 1000 < now.getTime();

  /** if token expired have to clear localStorage and auth data in store */
  if (isExpired) {
    toast.error("Your access token has expired.", { autoClose: 1000, hideProgressBar: true });

    dispatch(logout(history));
  }

  return (
      <Route
        {...rest}
        render={(props) => !isExpired && <Component {...props} />}
      />
  );
};

export default PrivateRoute;
