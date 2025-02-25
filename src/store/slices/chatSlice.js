import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatData = createAsyncThunk(
  "chat/fetchChatData",
  async ({ question }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { session_id } = user;

      const payload = {
        question: question,
        user_id: "kp1234",
        session_id: session_id,
      };

      console.log("Sending payload:", payload);

      const response = await fetch(
        "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Received response:", result);
      return result;
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  chatPage: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chatUI",
  initialState,
  reducers: {
    clearChat(state) {
      state.chatPage = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        if (action.payload.input && action.payload.output) {
          action.payload.id = state.chatPage.length + 1;
          state.chatPage.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
