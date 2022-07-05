import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../models/question";
import type { RootState } from "../../store";

export const addQuestionToList = createAsyncThunk(
  "question/addQuestion",
  async (question: Question, thunkApi) => {
    const delayEnabled = thunkApi.getState() as RootState;

    if (delayEnabled.question.delayEnabled)
      await new Promise((res) => setTimeout(res, 5000));

    return question;
  }
);

interface QuestionState {
  questionList: Question[];
  delayEnabled: boolean;
}

const initialState: QuestionState = {
  questionList: [
    {
      question: "How can i add a question? CLICK ME",
      id: Math.random(),
      answer:
        "You can enter your question and answer the above form and click the save button",
    },
  ],
  delayEnabled: false,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    disableDelay(state) {
      state.delayEnabled = false;
    },
    enableDelay(state) {
      state.delayEnabled = true;
    },
    removeAllQuestions(state) {
      state.questionList = [];
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questionList = state.questionList.filter(
        (q) => q.id !== action.payload
      );
    },
    editQuestion(state, action: PayloadAction<Question>) {
      state.questionList = state.questionList.map((q) => {
        if (q.id === action.payload.id)
          return { ...action.payload, id: Math.random() };
        return q;
      });
    },
    sortByQuestion(state) {
      state.questionList = state.questionList.sort((q, c) =>
        q.question.localeCompare(c.question)
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(
      addQuestionToList.fulfilled,
      (state, action: PayloadAction<Question>) => {
        state.questionList.push(action.payload);
      }
    );
  },
});

export const {
  enableDelay,
  disableDelay,
  removeAllQuestions,
  removeQuestion,
  sortByQuestion,
  editQuestion,
} = questionSlice.actions;

export const questions = (state: RootState) => state.question.questionList;

export default questionSlice.reducer;
