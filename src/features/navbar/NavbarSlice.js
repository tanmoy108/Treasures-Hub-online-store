import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
};

export const NavbarSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggle: (state) => {
      state.status = !state.status;
    }
  }
});

export const { setToggle } = NavbarSlice.actions;

export const selectStatus = (state) => state.toggle.status;

export default NavbarSlice.reducer;
