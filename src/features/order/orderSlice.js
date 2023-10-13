import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostOrder, GetOrder, PatchOrder } from './orderAPI';

const initialState = {
  order: [],
  totalOrder: 0,
  status: 'idle',
  currentOrder: null
};
export const PostOrderAsync = createAsyncThunk(
  'order/PostOrder',
  async (item) => {
    const response = await PostOrder(item);
    return response.data;
  }
);
export const GetOrderAsync = createAsyncThunk(
  'order/GetOrder',
  async (pagination) => {
    const response = await GetOrder(pagination);
    return response.data;
  }
);
export const PatchOrderAsync = createAsyncThunk(
  'order/PatchOrder',
  async (order) => {
    const response = await PatchOrder(order);
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
      })
      .addCase(GetOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload.orders;
        state.totalOrder = action.payload.totalOrders;
      })
      .addCase(PatchOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(PatchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.order.findIndex((order) => order.id === action.payload.id)
        state.order[index] = action.payload
      })
  },
});

export const { clearCurrentOrder } = OrderSlice.actions;

export const selectOrder = (state) => state.orders.currentOrder;
export const selectCurrentOrder = (state) => state.orders.clearCurrentOrder;
export const selectGetOrder = (state) => state.orders.order;
export const selectTotalOrder = (state) => state.orders.totalOrder;

export default OrderSlice.reducer;
