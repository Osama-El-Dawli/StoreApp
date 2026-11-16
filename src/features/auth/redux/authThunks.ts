import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse } from '../types/authTypes';
import { loginApi } from '../api/authApi';
import axios from 'axios';

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('login', async (loginRequest, { rejectWithValue }) => {
  try {
    const response = await loginApi(loginRequest);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
    return rejectWithValue('An unexpected error occurred');
  }
});
