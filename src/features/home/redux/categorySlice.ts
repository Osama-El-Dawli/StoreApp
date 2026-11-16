import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoryThunks';

interface CategoryState {
  isLoading: boolean;
  items: string[];
  error: string | null;
}

const initialState: CategoryState = {
  isLoading: false,
  error: null,
  items: [],
};

const CategorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          'Something went wrong';
      });
  },
});

export default CategorySlice.reducer;
