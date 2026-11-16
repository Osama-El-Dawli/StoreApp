import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../api/categoriesApi';
import axios from 'axios';
import { Category } from '../types/categoryType';
import { cache, CACHE_KEYS } from '../../../storage/cache';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();
      cache.set(CACHE_KEYS.categories, data);
      return data;
    } catch (error) {
      const cachedData = cache.get<Category[]>(CACHE_KEYS.categories);
      if (cachedData) return cachedData;

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to get categories',
        );
      }
    }
    return rejectWithValue('Unexpected Error');
  },
);
