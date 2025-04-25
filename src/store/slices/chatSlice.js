import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchChatData = createAsyncThunk(
  "chat/fetchChatData",
  async ({ question, messageId = null }, { getState, rejectWithValue }) => {
    try {
      const { user, history } = getState();
      const { session_id } = user;
      const activeThreadId = history.activeThreadId;
      const threadId = activeThreadId ? activeThreadId : session_id;

      const payload = {
        user_id: user.user_id,
        session_id: threadId,
        question: question,
      };

      const response = await fetch(
        "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/api/v1/chat/",
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
      return { ...result, question, messageId, threadId }; // Include threadId for history
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  chatData: [],
  loading: false,
  loadingMessageId: null,
  editingMessageId: null,
  error: null,
};

const chatSlice = createSlice({
  name: "chatUI",
  initialState,
  reducers: {
    clearChat(state) {
      state.chatData = [];
    },
    setChatHistory(state, action) {
      state.chatData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.loadingMessageId = action.meta.arg.messageId || null;
        console.log("Pending action:", action.meta.arg.messageId);
        if (action.meta.arg.messageId) {
          console.log("Editing message ID:", state.editingMessageId);
          state.editingMessageId = action.meta.arg.messageId;
          // Remove the old message immediately
          state.chatData = state.chatData.filter(
            (msg) => msg.messageId !== action.meta.arg.messageId
          );
        }
        console.log("State after pending:", state.chatData);
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.loading = false;
        state.editingMessageId = null;

        const messageId = action.meta.arg.messageId || uuidv4();
        action.payload.messageId = messageId;

        const newMessage = {
          ...action.payload,
          input: action.payload.question,
        };

        // Push the new edited message
        state.chatData.push(newMessage);
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = false;
        state.editingMessageId = null;
        state.error = action.payload;

        if (action.meta.arg.messageId) {
          state.chatData.push({
            messageId: action.meta.arg.messageId,
            input: action.meta.arg.question,
            output: "Failed to edit. Try again.",
            isError: true,
          });
        }
      });
  },
});

export const { clearChat, setChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
