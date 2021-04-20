import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';
import api from '../../api';

const initialAuth = localStorage.getItem('access_token')
  ? jwt(JSON.parse(localStorage.getItem('access_token')))?.sub
  : null;
console.log(initialAuth);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: initialAuth
  },
  reducers: {
    loginSuccess: (state, action) => {
      const decoded = jwt(action.payload);

      state.auth = decoded.sub;
      localStorage.setItem('access_token', JSON.stringify(action.payload));
    },
    logoutSucces: (state) => {
      state.auth = null;
      localStorage.removeItem('access_token');
    },
  }
});

export default authSlice.reducer;

// Actions
const {
  loginSuccess,
  logoutSucces
} = authSlice.actions;

export const login = (data, history) => async (dispatch) => {
  try {
    const res = await api.post('/login', data);

    dispatch(loginSuccess(res.data));

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    dispatch(logoutSucces());

    history.push('/signin');
  } catch (error) {
    console.log(error);
  }
};