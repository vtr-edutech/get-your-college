import { configureStore } from "@reduxjs/toolkit"
import collegeCategoryReducer from "./collegeCategorySlice"

export const store = configureStore({
  reducer: {
    collegeCategory: collegeCategoryReducer,
  },
});