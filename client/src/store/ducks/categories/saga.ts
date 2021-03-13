import { put, takeLatest, call, select } from 'redux-saga/effects'
import { QuizApi } from '../../../service/QuizApi'
import { selectCategories } from './selector'
import { setStatusLoading, setStatusSuccess, setStatusError, setCategories } from './slice'
import { fetchCategories } from './slice'


export function* categoriesWatcher() {
  yield takeLatest(fetchCategories, fetchCatsWorker )
}

function* fetchCatsWorker() {
  try {
    const categories: string[] = yield select(selectCategories)
    if (categories.length) {
      return
    }
    yield put(setStatusLoading())
    const cats: string[] = yield call(QuizApi.getCategories)
    yield put(setCategories(cats))
    yield put(setStatusSuccess())
  } catch (error) {
    yield put(setStatusError())
  } 
}
