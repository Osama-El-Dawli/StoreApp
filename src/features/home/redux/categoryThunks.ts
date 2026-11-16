import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../api/categoriesApi';
import axios from 'axios';
import { Category } from '../types/categoryType';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to get categories',
        );
      }
    }
    return rejectWithValue('Unexpected Error');
  },
);
