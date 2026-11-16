import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginEndPoint } from '../api/apiConst';
import { api } from '../api/apiService';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null as string | null,
};

export const authSlice = createAsyncThunk(
  loginEndPoint,
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post(loginEndPoint, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message ?? 'Login failed');
    }
  },
);

