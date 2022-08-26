import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavMobileOpen : false
}

const navSlice = createSlice({
  name : 'nav',
  initialState,
  reducers : {
    toggleNavMobile : (state) => {
      state.isNavMobileOpen = !state.isNavMobileOpen
    },
    closeNavMobile : (state) => {
      state.isNavMobileOpen = false
    }
  }
})

export const { toggleNavMobile, closeNavMobile } = navSlice.actions;
export default navSlice.reducer;