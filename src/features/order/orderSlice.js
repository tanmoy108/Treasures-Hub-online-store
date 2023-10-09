import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostOrder } from './orderAPI';

const initialState = {
  order: [],
  status: 'idle',
  currentOrder: null
};
export const PostOrderAsync = createAsyncThunk(
  'order/PostOrder',
  async (amount) => {
    const response = await PostOrder(amount);
    return response.data;
  }
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(PostOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { clearCurrentOrder } = OrderSlice.actions;

export const selectOrder = (state) => state.orders.currentOrder;
export const selectCurrentOrder = (state) => state.orders.clearCurrentOrder;

export default OrderSlice.reducer;
