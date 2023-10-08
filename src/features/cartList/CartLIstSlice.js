import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetCart,PostCart } from './CartListApi';

const initialState = {
  status: 'idle',
  cart:[],
};
export const CartPostAsync = createAsyncThunk(
  'cart/PostCart',
  async (data) => {
    console.log(data)
    const response = await PostCart(data);
    return response.data;
  }
);
export const CartGetAsync = createAsyncThunk(
  'cart/GetCart',
  async (id) => {
    const response = await GetCart(id);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CartPostAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartPostAsync .fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart.push(action.payload);
      })
      .addCase(CartGetAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartGetAsync .fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart= action.payload;
      });
  },
});

export const { increment} = cartSlice.actions;

export const selectCart = (state) => state.carts.cart;

export default cartSlice.reducer;
