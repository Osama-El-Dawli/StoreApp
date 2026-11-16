import { createSlice } from '@reduxjs/toolkit';
import { login } from './authThunks';
import { AuthState } from '../types/authTypes';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, ...user } = action.payload;
        state.isLoading = false;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error =
            (action.payload as string | undefined) ??
            action.error.message ??
            'Login Failed');
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
