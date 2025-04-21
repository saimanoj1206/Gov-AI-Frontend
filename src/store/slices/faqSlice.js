import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch FAQ data
export const fetchFaqData = createAsyncThunk(
  "faq/fetchFaqData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/api/v1/faq/",
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch FAQ data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqData.fulfilled, (state, action) => {
        state.loading = false;
        state.faqData = action.payload;
      })
      .addCase(fetchFaqData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;
