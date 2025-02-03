import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "kp1234",
  session_id: "0011aA",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user_id = action.payload.user_id;
      state.session_id = action.payload.session_id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
