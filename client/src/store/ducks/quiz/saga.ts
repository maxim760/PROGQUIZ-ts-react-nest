import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, call, select } from 'redux-saga/effects'
import { QuizApi } from '../../../service/QuizApi'
import { IResultTestToAdd, ResultsApi } from '../../../service/ResultsApi'
import { ROUTE_NAMES } from '../../../utils/routes'
import { ILoadingStatus } from '../../types'
import { selectUserID } from '../user/selectors'
import { selectPercentTest, selectQuiz, selectTimeForTest } from './selectors'
import { fetchQuiz, finishQuiz, setQuiz, setResultUrl, setStatusError, setStatusLoading, setStatusSuccess, setUrlStatus } from './slice'
import { IQuestion, ITest, ITestCategory } from './types'

export function* quizWatcher() {
  yield takeLatest(fetchQuiz, quizWorker )
  yield takeLatest(finishQuiz, finishQuizWorker )
}
export type ITestFromServer = {
  _id: string;
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

function* finishQuizWorker() {
  try {
    yield put(setUrlStatus(ILoadingStatus.LOADING))
    const quiz: ITest = yield select(selectQuiz)
    const time: number = yield select(selectTimeForTest)
    const rate: number = yield select(selectPercentTest)
    const resToAdd: IResultTestToAdd = {
      quiz: quiz._id,
      stat: {
        time, rate
      }
    }
    const userId: string = yield select(selectUserID)!
    const id: string = yield call(ResultsApi.sendResultTest, resToAdd)
    const url = `${window.location.origin}${ROUTE_NAMES.RESULT}${userId}/${id}`
    yield put(setResultUrl(url))
  } catch (error) {
    yield put(setUrlStatus(ILoadingStatus.ERROR))
  } 
}