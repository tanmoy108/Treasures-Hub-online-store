import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import NavbarReducer from '../features/navbar/NavbarSlice';
import ProductReducer from '../features/productList/ProductSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toggle: NavbarReducer,
    products: ProductReducer,
  },
});
