import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMe, login } from './authThunks';
import { AuthState } from '../types/authTypes';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
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
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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
      })
      .addCase(getMe.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Failed to fetch the user';
      });
  },
});

export const { logout, setTokens } = authSlice.actions;

export default authSlice.reducer;
