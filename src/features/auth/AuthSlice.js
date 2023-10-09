import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, PatchUsers, PostUsers } from './AuthApi';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};
export const userAsync = createAsyncThunk(
  'auth/PostUsers',
  async (userData) => {
    const response = await PostUsers(userData);
    return response.data;
  }
);
export const getUserAsync = createAsyncThunk(
  'auth/fetchUsers',
  async (userData) => {
    const response = await fetchUsers(userData);
    return response.data;
  }
);
export const patchUserAsync = createAsyncThunk(
  'auth/PatchUsers',
  async (userData) => {
    const response = await PatchUsers(userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      })
      .addCase(patchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(state.user)
        state.user = action.payload;
      })

  },
});

export const { increament } = userSlice.actions;

export const selectUser = (state) => state.users.user;

export default userSlice.reducer;
