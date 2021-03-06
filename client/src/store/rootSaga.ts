import { all } from "redux-saga/effects";
import { quizWatcher } from "./ducks/quiz/saga";

export function* rootSaga() {
  yield all([
    quizWatcher(),
  ]);
}