import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/productType';
import {
  getProducts,
  getProductsByCategory,
  deleteProduct,
} from '../api/productsApi';
import axios from 'axios';
import { cache, CACHE_KEYS } from '../../../storage/cache';
import { checkIsOffline } from '../../../utils/network';

export const fetchProducts = createAsyncThunk<Product[]>(
  'getProducts',
  async (_, { rejectWithValue, signal }) => {
    const key = CACHE_KEYS.products('all');
    if (await checkIsOffline()) {
      return cache.get(key) ?? rejectWithValue('Failed to get products');
    }
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
    if (await checkIsOffline()) {
      return cache.get(key) ?? rejectWithValue('Failed to get products');
    }
    try {
      const data = await getProductsByCategory(category);
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

export const removeProduct = createAsyncThunk<string, string>(
  'deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      cache.removeProductFromCache(id);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to delete the product',
        );
      }
      return rejectWithValue('Un expected error');
    }
  },
);
