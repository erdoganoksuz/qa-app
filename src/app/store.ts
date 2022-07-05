import { configureStore } from "@reduxjs/toolkit";

import questionReducer from "./features/question/question-slice";

const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
