import { takeLatest, put, select, call } from "redux-saga/effects";
import { QuizApi } from "../../../service/QuizApi";
import { ILoadingStatus } from "../../types";
import { selectCreatedTest } from "./selectors";
import {
  fetchCreateTest,
  resetCreateTest,
  setCreateError,
  setCreateStatus,
  setCreateUrl,
} from "./slice";
import { ICreatedTest } from "./types";

export function* createWatcher() {
  yield takeLatest(fetchCreateTest, createWorker);
}

function* createWorker() {
  try {
    const test: ICreatedTest = yield select(selectCreatedTest);
    // 80% => 0.8
    const url: string = yield call(QuizApi.create, {
      ...test,
      successResult: test.successResult / 100,
    });
    yield put(setCreateUrl(url));
  } catch (error) {
    console.log("ERROR");
    yield put(setCreateError(error.message));
  }
}
