import { configureStore } from '@reduxjs/toolkit';
import NavbarReducer from '../features/navbar/NavbarSlice';
import ProductReducer from '../features/productList/ProductSlice';
import UserReducer from '../features/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    toggle: NavbarReducer,
    products: ProductReducer,
    users:UserReducer,
  },
});
