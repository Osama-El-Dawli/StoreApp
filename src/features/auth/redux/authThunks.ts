import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse, User } from '../types/authTypes';
import { getMeApi, loginApi } from '../api/authApi';
import axios from 'axios';
import { saveTokens } from '../storage/tokenStorage';

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('login', async (loginRequest, { rejectWithValue }) => {
  try {
    const response = await loginApi(loginRequest);
    await saveTokens(response.accessToken, response.refreshToken);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
  'getMe',
  async (_, { rejectWithValue }) => {
    try {
      return await getMeApi();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch user',
        );
      }
      return rejectWithValue('Unexpected Error');
    }
  },
);
