import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CheckUsers, PostUsers } from './AuthApi';
import { PatchUsers } from '../user/userAPI';

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
  'auth/CheckUsers',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await CheckUsers(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);
export const patchUserAsync = createAsyncThunk(
  'auth/PatchUsers',
  async (userData) => {
    const response = await PatchUsers(userData);
    return response.data;
  }
);
// export const logOutUserAsync = createAsyncThunk(
//   'auth/logout',
//   async (userData) => {
//     const response = await logout(userData);
//     return response.data;
//   }
// );

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    logOutUserAsync: (state) => {
      state.user = null;
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
        state.error = action.payload;
      })
      .addCase(patchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })

  },
});

export const { increament, logOutUserAsync } = userSlice.actions;

export const selectUser = (state) => state.users.user;
export const selectError = (state) => state.users.error;

export default userSlice.reducer;
