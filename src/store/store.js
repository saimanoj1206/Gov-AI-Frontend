import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice";
import historyReducer from "./slices/historySlice";
import listenerMiddleware from "./slices/listenerMiddleware";
import faqReducer from "./slices/faqSlice";

export const store = configureStore({
  reducer: {
    chatUI: chatReducer,
    user: userReducer,
    history: historyReducer,
    faqData: faqReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;
