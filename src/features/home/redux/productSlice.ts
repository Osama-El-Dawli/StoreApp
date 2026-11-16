import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../types/productType';
import { fetchProducts } from './productThunks';

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = state.error =
          (action.payload as string) ??
          action.error.message ??
          'Something went wrong';
      });
  },
});

export default ProductSlice.reducer;
