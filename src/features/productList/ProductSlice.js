import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct, fetchFilterProduct } from './ProductAPI';

const initialState = {
productArray:[],
status: 'idle',
totalCount:0,
};
export const productAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);
export const filterproductAsync = createAsyncThunk(
  'product/fetchFilterProduct',
  async ({filterSelect,sortSelect,pagination}) => {
    const response = await fetchFilterProduct(filterSelect,sortSelect,pagination);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productArray = action.payload;
      })
      .addCase(filterproductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterproductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productArray = action.payload.products;
        state.totalCount = action.payload.totalItems;
      });
  },
});

export const { increment } = ProductSlice.actions;

export const selectProduct = (state) => state.products.productArray;
export const selectProductCount = (state) => state.products.totalCount;

export default ProductSlice.reducer;
