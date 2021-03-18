import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, call } from 'redux-saga/effects'
import { IToken, UsersApi } from '../../../service/UsersApi'
import { getDataFromJwt } from '../../../utils/getDataFromJwt'
import { fetchLoginUser, fetchRegisterUser, setAuthError, setAuthStatusSuccess, setIsAuth, setNotIsAuth, setUser } from './slice'
import {  IUser, IUserForLogin, IUserForRegister } from './types'

export function* userWatcher() {
  yield takeLatest(fetchRegisterUser, userRegisterWorker)
  yield takeLatest(fetchLoginUser, userLoginWorker)
}

function* userLoginWorker({ payload }: PayloadAction<IUserForLogin>) {
  try {
    const { access_token }: IToken = yield call(UsersApi.login, payload)
    if (access_token) {
      window.localStorage.setItem("token", "Bearer " + access_token)
    }
    const userData = getDataFromJwt<IUser>(access_token)
    yield put(setIsAuth())
    yield put(setUser(userData))
    yield put(setAuthStatusSuccess())
  } catch (error) {
    yield put(setNotIsAuth())
    yield put(setAuthError(error.message))
  } 
  
}
function* userRegisterWorker({ payload }: PayloadAction<IUserForRegister>) {
  try {
    yield call(UsersApi.registration, payload)
    yield put(setAuthStatusSuccess())
  } catch (error) {
    yield put(setAuthError(error.message))
  } 
  
}