import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL =
  "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/api/v1/threads/";

// 🟢 POST Thread History
export const postThreadHistory = createAsyncThunk(
  "history/postThreadHistory",
  async ({ threadName }, { getState, rejectWithValue }) => {
    try {
      const { user, history } = getState();
      const { session_id } = user;
      const activeThreadId = history.activeThreadId;
      const threadId = activeThreadId ? activeThreadId : session_id;

      const encodedThreadName = encodeURIComponent(threadName.trim());
      const url = `${API_BASE_URL}?userId=${"kp1234"}&threadId=${threadId}&threadName=${encodedThreadName}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error posting thread history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// 🟢 GET Thread History
export const getThreadHistory = createAsyncThunk(
  "history/getThreadHistory",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${API_BASE_URL}?userId=${"kp1234"}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching thread history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
// 🟢 DELETE Thread History
export const deleteThreadHistory = createAsyncThunk(
  "history/deleteThreadHistory",
  async ({ threadId }, { rejectWithValue }) => {
    if (!threadId) {
      console.error("Error: threadId is undefined. Ensure it is passed correctly.");
      throw new Error("threadId is required but was not provided.");
    }
    console.log("threadId..........", threadId);
    try {
      const url = `${API_BASE_URL}${threadId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete thread history");
      }

      return threadId; // Return the deleted threadId for further state updates
    } catch (error) {
      console.error("Error deleting thread history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
// 🟢 POST Message History
export const postMessageHistory = createAsyncThunk(
  "history/postMessageHistory",
  async ({ threadId, message }, { rejectWithValue }) => {
    try {
      console.log("message", message);
      const url = `${API_BASE_URL}${threadId}/messages`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("Failed to post message history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error posting message history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// 🟢 GET Message History
export const getMessageHistory = createAsyncThunk(
  "history/getMessageHistory",
  async ({ threadId }, { rejectWithValue }) => {
    try {
      const url = `${API_BASE_URL}${threadId}/messages`;

      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch message history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching message history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
// 🟢 PUT Update Message History
export const updateMessageHistory = createAsyncThunk(
  "history/updateMessageHistory",
  async ({ messageId, updatedMessage }, { rejectWithValue }) => {
    const API_BASE_URL =
      "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/api/v1/";
    console.log("messageId", messageId);
    try {
      const url = `${API_BASE_URL}messages/${messageId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to update message history");
      }

      return await response.json(); // Assuming API returns updated message
    } catch (error) {
      console.error("Error updating message history:", error.message);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    threads: [],
    messages: [],
    loading: false,
    error: null,
    resumeChat: false,
    activeThreadId: null,
  },
  reducers: {
    setThreads(state, action) {
      state.threads = action.payload;
    },
    setMessages(state, action) {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },
    setResumeChat(state, action) {
      state.resumeChat = action.payload;
    },
    setActiveThreadId(state, action) {
      state.activeThreadId = action.payload; // ✅ New reducer to update activeThreadId
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThreadHistory.fulfilled, (state, action) => {
        state.threads = action.payload;
      })
      .addCase(getThreadHistory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMessageHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages || [];
        state.resumeChat = true;
        state.activeThreadId = action.meta.arg.threadId; // Store the active thread
      })
      .addCase(getMessageHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postMessageHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postMessageHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = [...state.messages, action.payload]; // Corrected push issue
      })
      .addCase(postMessageHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMessageHistory.fulfilled, (state, action) => {
        const updatedMessage = action.payload;
        state.messages = state.messages.map((msg) =>
          msg.messageId === updatedMessage.messageId ? updatedMessage : msg
        );
      })
      .addCase(updateMessageHistory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setThreads, setMessages, setResumeChat, setActiveThreadId } =
  historySlice.actions;
export default historySlice.reducer;
