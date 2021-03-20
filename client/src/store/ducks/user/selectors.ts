import { statusToObj } from "../../../utils/statusToObj";
import { RootState } from "../../rootReducer";
import { ILoadingStatus } from "../../types";

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectUserID = (state: RootState) => selectUser(state)?._id;
export const selectUserIsAuth = (state: RootState) => selectUserState(state).isAuth
export const selectAuthStatus = (state: RootState) => {
  const status = selectUserState(state).authStatus
  return statusToObj(status)
}

export type IAuthErrorSelector = null | {
  count: "one",
  error: string
} | {
  count: "many"
  error: string[]
}

export const selectAuthError = (state: RootState): IAuthErrorSelector => {
  const error = selectUserState(state).authError
  if (!error) {
    return null
  }
  // одна ошибка или массив ошибок
  if (typeof error === "string") {
    return {
      count: "one",
      error
    }
  }
  return {
    error,
    count: "many"
  }
}