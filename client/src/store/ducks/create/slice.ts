import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoadingStatus } from "../../types";
import { IChars, ICreatedQuest, ICreateState } from "./types";

const initialState: ICreateState = {
  category: "",
  title: "",
  description: "",
  successResult: 80,
  questions: [],
  createStatus: ILoadingStatus.NEVER,
  error: null,
  url: null
};
const createTestSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setTestChars(
      state,
      action: PayloadAction<IChars>
    ) {
      // id для получения теста
      const { category, title, description, successResult } = action.payload;
      state.category = category;
      state.title = title;
      state.description = description;
      state.successResult = successResult;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSuccessResult(state, action: PayloadAction<number>) {
      state.successResult = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    addQuestion(state, action: PayloadAction<ICreatedQuest>) {
      state.questions.push(action.payload);
    },
    removeQuestion(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.questions.splice(
        state.questions.findIndex((q) => q.id === id),
        1
      );
    },
    updateQuestion(state, action: PayloadAction<ICreatedQuest>) {
      const quest = action.payload;
      state.questions = state.questions.map((q) => {
        if (q.id === quest.id) {
          return quest;
        }
        return q;
      });
    },
    resetCreateTest(state, action: PayloadAction<void>) {
      return initialState
    },
    setCreateStatus(state, action: PayloadAction<ILoadingStatus>) {
      state.createStatus = action.payload;
    },
    fetchCreateTest(state, action: PayloadAction<void>) {
      state.createStatus = ILoadingStatus.LOADING;
    },
    setCreateError(state, action: PayloadAction<string>) {
      state.createStatus = ILoadingStatus.ERROR;
      state.error = action.payload;
    },
    setCreateUrl(state, action: PayloadAction<string>) {
      state.createStatus = ILoadingStatus.SUCCESS;
      state.url = action.payload;
    },
  },
});

export const {
  setTestChars,
  setCategory,
  setSuccessResult,
  setDescription,
  setTitle,
  addQuestion,
  removeQuestion,
  updateQuestion,
  resetCreateTest,
  setCreateStatus,
  fetchCreateTest,
  setCreateError,
  setCreateUrl,
} = createTestSlice.actions;
export const createReducer = createTestSlice.reducer;
