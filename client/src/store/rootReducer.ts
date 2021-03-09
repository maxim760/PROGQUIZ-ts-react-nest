import { combineReducers } from "@reduxjs/toolkit";
import { quizReducer } from "./ducks/quiz/slice";
import { userReducer } from "./ducks/user/slice";

export const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>;