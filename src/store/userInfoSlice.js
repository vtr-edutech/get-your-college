import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  initialState: {
    user: {}
  },
  name: "userInfo",
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
