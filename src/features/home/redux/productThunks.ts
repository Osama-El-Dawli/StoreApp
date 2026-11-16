import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/productType';
import { getProducts, getProductsByCategory } from '../api/productsApi';
import axios from 'axios';

export const fetchProducts = createAsyncThunk<Product[]>(
  'getProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
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
  async (category, {rejectWithValue}) => {
    try {
      return await getProductsByCategory(category);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to get products',
        );
      }
      return rejectWithValue('Un expected error');
    }
  }
)
