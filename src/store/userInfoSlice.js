import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  initialState: {},
  name: "userInfo",
  reducers: {
    setUserData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setUserData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
