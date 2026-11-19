import { createSlice } from '@reduxjs/toolkit';

interface QuantityState {
  quantities: Record<string, number>;
}

const initialState: QuantityState = {
  quantities: {},
};

const QuantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id, stock } = action.payload;
      const current = state.quantities[id] ?? 0;
      if (current < stock) state.quantities[id] = current + 1;
    },
    decrement: (state, action) => {
      const id = action.payload;
      const current = state.quantities[id] ?? 0;
      if (current > 0) state.quantities[id] = current - 1;
    },
  },
});

export const { increment, decrement } = QuantitySlice.actions;
export default QuantitySlice.reducer;
