import { ILoadingStatus } from "../../types";

export type IUser = {
  _id: string;
  username: string;
  email: string
};

export type IAuthError = null | string | string[]

export type IUserState = {
  isAuth: boolean;
  user: null | IUser;
  authStatus: ILoadingStatus;
  authError: IAuthError
};

export type IUserForLogin = {
  email: string;
  password: string;
};

export type IUserForRegister = {
  username: string;
  email: string;
  password: string;
  password2: string;
};
