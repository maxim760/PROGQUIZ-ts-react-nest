import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./ducks/categories/slice";
import { createReducer } from "./ducks/create/slice";
import { quizReducer } from "./ducks/quiz/slice";
import { userReducer } from "./ducks/user/slice";

export const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
  categories: categoriesReducer,
  create: createReducer
})

export type RootState = ReturnType<typeof rootReducer>;