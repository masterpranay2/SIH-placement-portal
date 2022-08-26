import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSideBarNum: 1,
}

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    selectSideBar: (state, action) => {
      state.selectedSideBarNum = action.payload;
    },
    resetSideBar: (state) => {
      state.selectedSideBarNum = 1;
    }
  }
});

export const { selectSideBar, resetSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;