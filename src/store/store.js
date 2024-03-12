import { configureStore } from "@reduxjs/toolkit"
import collegeCategoryReducer from "./collegeCategorySlice"
import userInfoReducer from "./userInfoSlice";

export const store = configureStore({
  reducer: {
    collegeCategory: collegeCategoryReducer,
    userInfo: userInfoReducer,
  },
});