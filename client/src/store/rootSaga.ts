import { all } from "redux-saga/effects";
import { quizWatcher } from "./ducks/quiz/saga";
import { userWatcher } from "./ducks/user/saga";

export function* rootSaga() {
  yield all([
    quizWatcher(),
    userWatcher()
  ]);
}