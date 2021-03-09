import { $authHost, $host } from ".";
import {
  IUser,
  IUserForLogin,
  IUserForRegister,
} from "../store/ducks/user/types";
export type IUserAfterRegister = {
  _id: string;
  email: string;
  username: string;
};
export type IToken = {
  access_token: string;
};
export type IServerData<T> = {
  data: T;
};

export type IProfile = {
  userId: string;
  username: string;
  email: string;
};

export const UsersApi = {
  async registration(payload: IUserForRegister): Promise<IUser> {
    try {
      const { data }: IServerData<IUser> = await $host.post(
        `/user/registration`,
        payload
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async login(payload: IUserForLogin): Promise<IToken> {
    try {
      console.log("login");
      const {
        data,
      }: IServerData<IToken> = await $host.post(
        "/auth/login",
        { username: payload.email, password: payload.password }
        );
      console.log(data)
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getProfile(): Promise<IUser> {
    try {
      const { data }: IServerData<IProfile> = await $authHost.get(
        "/auth/profile"
      );
      return { username: data.username, _id: data.userId, email: data.email };
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async verify(hash: string): Promise<string> {
    try {
      const { data }: IServerData<string> = await $authHost.get(
        `/auth/verify?hash=${hash}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
