import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoadingStatus } from "../../types";
import { ITestStatus } from "../quiz/types";
import { IAuthError, IUser, IUserForLogin, IUserForRegister, IUserState } from "./types";

const initialState: IUserState = {
  isAuth: false,
  user: null,
  authStatus: ILoadingStatus.NEVER,
  authError: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = true;
    },
    setNotIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setAuthError(state, action: PayloadAction<IAuthError>) {
      state.authError = action.payload;
      state.authStatus = ILoadingStatus.ERROR
    },
    fetchLoginUser(state, action: PayloadAction<IUserForLogin>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
    fetchRegisterUser(state, action: PayloadAction<IUserForRegister>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
    setAuthStatusError(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.ERROR;
      state.isAuth = false;
      state.user = null;
    },
    setAuthStatusNever(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.NEVER;
    },
    setAuthStatusSuccess(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.SUCCESS;
    },
    setAuthStatusLoading(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
  },
});

export const {
  setIsAuth,
  setNotIsAuth,
  setUser,
  fetchLoginUser,
  fetchRegisterUser,
  setAuthStatusError,
  setAuthStatusNever,
  setAuthStatusSuccess,
  setAuthStatusLoading,
  setAuthError
} = userSlice.actions;
export const userReducer = userSlice.reducer;
