import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../types/cardType';
import { removeProduct } from '../../home/redux/productThunks';

const initialState: CartState = { items: {} };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const { product, color } = action.payload;
      const id = `${product.id}-${color}`;
      const quantity = Object.values(state.items)
        .filter(i => i.product.id === product.id)
        .reduce((sum, i) => sum + i.quantity, 0);
      if (quantity >= product.stock) return;

      const current = state.items[id];
      if (current) current.quantity++;
      else state.items[id] = { id, product, color, quantity: 1 };
    },

    decrement: (state, action) => {
      const { productId, color } = action.payload;
      const id = `${productId}-${color}`;
      const item = state.items[id];
      if (!item) return;
      if (item.quantity > 1) item.quantity--;
      else delete state.items[id];
    },

    changeColor: (state, action) => {
      const old = state.items[action.payload.id];

      const newId = `${old.product.id}-${action.payload.color}`;

      const target = state.items[newId];
      if (target) {
        target.quantity += old.quantity;
      } else {
        state.items[newId] = { ...old, id: newId, color: action.payload.color };
      }
      delete state.items[old.id];
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      const productId = String(action.payload);
      Object.keys(state.items).forEach(key => {
        if (String(state.items[key].product.id) === productId) {
          delete state.items[key];
        }
      });
    });
  },
});

export const { increment, decrement, changeColor, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
