import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchChatData } from "./chatSlice";
import {
  getThreadHistory,
  postMessageHistory,
  updateMessageHistory,
} from "./historySlice";

const listenerMiddleware = createListenerMiddleware();
const seenThreadIds = new Set();

listenerMiddleware.startListening({
  actionCreator: fetchChatData.fulfilled,
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { threadId, messageId, question, output, source_documents } =
      action.payload;

    console.log("Listener triggered - action payload:", action.payload);
    console.log("Action meta:", action.meta);

    // if (!messageId) {
    //   console.warn("No messageId found, skipping update/post.");
    //   return; // Ensure message has an ID before saving
    // }

    const newMessageHistory = {
      messageId,
      query: question,
      answer: output,
      sources: source_documents,
      updatedAt: Date.now().toString(),
      intermediateSteps: [{}],
      inferenceTime: 0,
    };

    // Ensure isEdit is determined correctly
    const isEdit = Boolean(action.meta.arg?.messageId);
    console.log("Is edit?", isEdit);

    if (isEdit) {
      console.log("Dispatching updateMessageHistory with:", newMessageHistory);
      dispatch(
        updateMessageHistory({
          messageId: newMessageHistory.messageId,
          updatedMessage: newMessageHistory,
        })
      );
    } else {
      console.log("Dispatching postMessageHistory with:", newMessageHistory);
      dispatch(postMessageHistory({ threadId, message: newMessageHistory }));
    }

    if (!seenThreadIds.has(threadId)) {
      seenThreadIds.add(threadId);
      dispatch(getThreadHistory());
    }
  },
});

export default listenerMiddleware;
