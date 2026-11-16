import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/productType';
import { getProducts, getProductsByCategory } from '../api/productsApi';
import axios from 'axios';
import { cache, CACHE_KEYS } from '../../../storage/cache';

export const fetchProducts = createAsyncThunk<Product[]>(
  'getProducts',
  async (_, { rejectWithValue, signal }) => {
    const key = CACHE_KEYS.products('all');
    try {
      const data = await getProducts();
      cache.set(key, data);
      return data;
    } catch (error) {
      if (signal.aborted) {
        return rejectWithValue('Aborted');
      }

      const cachedData = cache.get<Product[]>(key);
      if (cachedData) return cachedData;

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to get products',
        );
      }
      return rejectWithValue('Un expected error');
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  'getProductsByCategory',
  async (category, { rejectWithValue, signal }) => {
    const key = CACHE_KEYS.products(category);
    try {
      const data = await getProductsByCategory(category);
      cache.set(key, data);
      return data;
    } catch (error) {
      if(signal.aborted) {
        return rejectWithValue('Aborted');
      }
      
      const cachedData = cache.get<Product[]>(key);
      if(cachedData) return cachedData;

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to get products',
        );
      }
      return rejectWithValue('Un expected error');
    }
  },
);
