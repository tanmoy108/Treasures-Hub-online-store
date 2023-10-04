import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import NavbarReducer from '../features/navbar/NavbarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toggle: NavbarReducer,
  },
});
