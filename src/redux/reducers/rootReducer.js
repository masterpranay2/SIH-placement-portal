import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import navReducer from "./navReducer";
import breadCrumbReducer from "./breadCrumbReducer";
import sidebarReducer from "./sidebarReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  breadCrumb: breadCrumbReducer,
  sidebar: sidebarReducer,
  login: loginReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);