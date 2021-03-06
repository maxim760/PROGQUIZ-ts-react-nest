import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, call } from 'redux-saga/effects'
import { QuizApi } from '../../../service/QuizApi'
import { fetchQuiz, setQuiz, setStatusError, setStatusLoading, setStatusSuccess } from './slice'
import { IQuestion, ITest, ITestCategory } from './types'

export function* quizWatcher() {
  yield takeLatest(fetchQuiz, quizWorker )
}
export type ITestFromServer = {
  _id: number;
  category: ITestCategory;
  title: string;
  description: string;
  questions: IQuestion[]
  successResult: number;
}
function* quizWorker({ payload }: PayloadAction<string>) {
  try {
    yield put(setStatusLoading())
    const id = payload
    const quiz: ITestFromServer = yield call(QuizApi.getOne, id)
    const newQuiz: ITest = {
      ...quiz,
      length: quiz.questions.length,
      questions: quiz.questions.reduce((acc: ITest["questions"], value, i) => {
        acc[i + 1] = {...value, _id: i + 1}
        return acc

      }, {})
    }
    yield put(setQuiz(newQuiz))
    yield put(setStatusSuccess())
  } catch (error) {
    yield put(setStatusError())
  } 
  
}