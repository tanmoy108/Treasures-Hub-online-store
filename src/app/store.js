import { configureStore } from '@reduxjs/toolkit';
import NavbarReducer from '../features/navbar/NavbarSlice';
import ProductReducer from '../features/productList/ProductSlice';
import UserReducer from '../features/auth/AuthSlice';
import CartReducer from '../features/cartList/CartLIstSlice';
import OrderReducer from '../features/order/orderSlice';
import UserInfoReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    toggle: NavbarReducer,
    products: ProductReducer,
    users: UserReducer,
    carts: CartReducer,
    orders: OrderReducer,
    userInfo: UserInfoReducer
  },
});
