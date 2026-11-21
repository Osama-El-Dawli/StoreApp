import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ProductState } from '../types/productType';
import {
  fetchProducts,
  fetchProductsByCategory,
  removeProduct,
} from './productThunks';

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  removingIds: [],
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(removeProduct.fulfilled, (state, action) => {
      const id = String(action.meta.arg);
      state.removingIds = state.removingIds.filter(i => i !== id);
      state.products = state.products.filter(p => String(p.id) !== id);
    })
      .addCase(removeProduct.pending, (state, action) => {
        state.removingIds.push(String(action.meta.arg));
      })
      .addCase(removeProduct.rejected, (state, action) => {
        const id = String(action.meta.arg);
        state.removingIds = state.removingIds.filter(i => i !== id);
      })
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
          if (action.meta.aborted) return;
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
