import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn : false,
  role : '',
  roleId: ''
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = '';
            state.roleId = '';
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.roleId = action.payload.roleId;
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;