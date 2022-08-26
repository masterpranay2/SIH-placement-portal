import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breadCrumbList: [{
    name: "Home",
    url: "/"
  }]
}

const breadCrumbSlice = createSlice({
  name: "breadCrumb",
  initialState,
  reducers: {
    addBreadCrumb: (state, action) => {
      state.breadCrumbList.push(action.payload);
    },
    removeBreadCrumb: (state) => {
      state.breadCrumbList.pop();
    },
    clearBreadCrumb: (state) => {
      state.breadCrumbList = [];
    }
  }
});

export const { addBreadCrumb, removeBreadCrumb, clearBreadCrumb } = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;