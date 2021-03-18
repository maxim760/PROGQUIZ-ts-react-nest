import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoadingStatus } from "../../types";
import { IQuizState, ITestAnswer, ITestStatus, ITest } from "./types";



const initialState: IQuizState = {
  quiz: null,
  activeQuestion: 1,
  status: ITestStatus.NONE,
  answers: [],
  startTime: 0,
  finishTime: 0,
  loadingStatus: ILoadingStatus.NEVER,
  resultUrl: null,
  urlStatus: ILoadingStatus.NEVER
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuiz(state, action: PayloadAction<string>) {
      // id для получения теста
      state.loadingStatus = ILoadingStatus.LOADING
    },
    setQuiz(state, action: PayloadAction<ITest>) {
      state.quiz = action.payload
    },
    nextQuestion(state, action: PayloadAction<void>) {
      state.activeQuestion++;
    },
    finishQuiz(state, action: PayloadAction<void>) {
      state.finishTime = Date.now()
      state.activeQuestion = 1;
      state.status = ITestStatus.FINISH;
    },
    setProgressTest(state, action: PayloadAction<void>) {
      state.status = ITestStatus.PROGRESS;
      state.startTime = Date.now()
    },
    resetTest(state, action: PayloadAction<void>) {
      state.activeQuestion = 1;
      state.answers = []
      state.resultUrl = null;
      state.status = ITestStatus.NONE;
      state.urlStatus = ILoadingStatus.NEVER;
    },
    addAnswer(state, action: PayloadAction<ITestAnswer>) {
      const error = action.payload;
      state.answers.push(error);
    },
    clearAnswers(state) {
      state.answers = [];
    },
    setStartTime(state, action: PayloadAction<void>) {
      state.startTime = Date.now();
    },
    clearStartTime(state, action: PayloadAction<void>) {
      state.startTime = 0
    },
    setStatusNever(state, action: PayloadAction<void>) {
      state.loadingStatus = ILoadingStatus.NEVER
    },
    setStatusError(state, action: PayloadAction<void>) {
      state.loadingStatus = ILoadingStatus.ERROR
    },
    setStatusSuccess(state, action: PayloadAction<void>) {
      state.loadingStatus = ILoadingStatus.SUCCESS
    },
    setStatusLoading(state, action: PayloadAction<void>) {
      state.loadingStatus = ILoadingStatus.LOADING
    },
    setResultUrl(state, action: PayloadAction<string>) {
      state.resultUrl = action.payload
      state.urlStatus = ILoadingStatus.SUCCESS
    },
    setUrlStatus(state, action: PayloadAction<ILoadingStatus>) {
      state.urlStatus = action.payload
    },
  },
});

export const {
  fetchQuiz,
  setQuiz,
  nextQuestion,
  finishQuiz,
  setProgressTest,
  resetTest,
  addAnswer,
  clearAnswers,
  setStartTime,
  clearStartTime,
  setStatusNever,
  setStatusError,
  setStatusSuccess,
  setStatusLoading,
  setResultUrl,
  setUrlStatus
} = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
