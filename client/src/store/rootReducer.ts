import { combineReducers } from "@reduxjs/toolkit";
import { quizReducer } from "./ducks/quiz/slice";

export const rootReducer = combineReducers({
  quiz: quizReducer
})

export type RootState = ReturnType<typeof rootReducer>;