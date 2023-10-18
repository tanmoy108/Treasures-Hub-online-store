import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrder,fetchUserInfo, PatchUsers } from './userAPI';

const initialState = {
  userOrder:null,
  status: 'idle',
  userInfo:null
};
export const fetchUserOrderAsync = createAsyncThunk(
  'userInfo/fetchUserOrder',
  async (userId) => {
    const response = await fetchUserOrder(userId);
    return response.data;
  }
);
export const fetchUserInfoAsync = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async (userId) => {
    const response = await fetchUserInfo(userId);
    return response.data;
  }
);
export const UpdateUserInfoAsync = createAsyncThunk(
  'userInfo/PatchUsers',
  async (userInfo) => {
    const response = await PatchUsers(userInfo);
    return response.data;
  }
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder= action.payload;
        console.log(action.payload);
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      })
      .addCase(UpdateUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      })
  },
});

export const { increment} = userInfoSlice.actions;

export const selectUserOrder = (state) => state.userInfo.userOrder;
export const selectUserInfo = (state) => state.userInfo.userInfo;

export default userInfoSlice.reducer;
