import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ProductState } from '../types/productType';
import { fetchProducts, fetchProductsByCategory } from './productThunks';

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
      .addMatcher(
        isAnyOf(fetchProducts.pending, fetchProductsByCategory.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(fetchProducts.fulfilled, fetchProductsByCategory.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.products = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchProducts.rejected, fetchProductsByCategory.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error =
            (action.payload as string) ??
            action.error.message ??
            'Something went wrong';
        },
      );
  },
});

export default ProductSlice.reducer;
