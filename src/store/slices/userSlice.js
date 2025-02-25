import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  user_id: "kp1234",
  session_id: uuidv4(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user_id = action.payload.user_id;
      state.session_id = action.payload.session_id;
    },
    setNewSession(state) {
      state.session_id = uuidv4();
    },
  },
});

export const { setUser, setNewSession } = userSlice.actions;
export default userSlice.reducer;
