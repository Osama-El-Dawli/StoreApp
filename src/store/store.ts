import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/redux/authSlice';
import productReducer from '../features/home/redux/productSlice';
import categoryReducer from '../features/home/redux/categorySlice';
import cartReducer from '../features/cart/redux/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
