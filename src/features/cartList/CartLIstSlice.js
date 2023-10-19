import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetCart, PostCart, PatchCart, DeleteCart, ClearCart } from './CartListApi';

const initialState = {
  status: 'idle',
  cart: [],
  checkCart:false
};
export const CartPostAsync = createAsyncThunk(
  'cart/PostCart',
  async (data) => {
    const response = await PostCart(data);
    return response.data;
  }
);
export const CartGetAsync = createAsyncThunk(
  'cart/GetCart',
  async () => {
    const response = await GetCart();
    return response.data;
  }
);
export const CartPatchAsync = createAsyncThunk(
  'cart/PatchCart',
  async (item) => {
    const response = await PatchCart(item);
    return response.data;
  }
);
export const CartDeleteAsync = createAsyncThunk(
  'cart/DeleteCart',
  async (id) => {
    const response = await DeleteCart(id);
    return response.data;
  }
);
export const CartClearAsync = createAsyncThunk(
  'cart/ClearCart',
  async () => {
    const response = await ClearCart();
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
      .addCase(CartPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart.push(action.payload);
      })
      .addCase(CartGetAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartGetAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = action.payload;
        state.checkCart = true;
      })
      .addCase(CartGetAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.checkCart = true;
      })
      .addCase(CartPatchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartPatchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cart.findIndex((item) => item.id === action.payload.id)
        state.cart[index] = action.payload;
      })
      .addCase(CartDeleteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartDeleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cart.findIndex((item) => item.id === action.payload.id)
        state.cart.splice(index, 1)
      })
      .addCase(CartClearAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CartClearAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = []
      })
  },
});

export const { increment } = cartSlice.actions;

export const selectCart = (state) => state.carts.cart;
export const selectCartAuth = (state) => state.carts.checkCart;

export default cartSlice.reducer;
