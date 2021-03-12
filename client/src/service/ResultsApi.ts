import { $authHost, $host } from ".";
import { ITestFromServer } from "../store/ducks/quiz/saga";
import { IQuizState, ITest } from "../store/ducks/quiz/types";
import { IUser } from "../store/ducks/user/types";

export type IServerData<T> = {
  data: T;
};

export type IStat = {
  _id: string;
  date: number;
  time: number;
  rate: number;
};

export type ISuccessTry = {
  isSuccess: boolean;
    numberTry: number;
}

export type IResultTest = {
  quiz: ITest;
  count: number;
  stat: IStat[];
  successTry: ISuccessTry
}
export type IOneResult = {
  user: IUser
  result: IResultTest
}
export type IResultTestToAdd = {
  quiz: string; // quizId
  stat: Omit<IStat, "_id" | "date">;
};

export const ResultsApi = {
  async sendResultTest(payload: IResultTestToAdd): Promise<string> {
    try {
      // data - is _id of sended quiz
      const { data }: IServerData<string> = await $authHost.post(
        "/user/test",
        payload
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getResultsTest(): Promise<IResultTest[]> {
    try {
      const { data }: IServerData<IResultTest[]> = await $authHost.get("/user/test");
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async getOneResult({userId,id}: {userId: string,id: string}): Promise<IOneResult> {
    try {
      console.log("try")
      const url = `/user/test/${id}?userId=${userId}`
      console.log(url)
      const { data }: IServerData<IOneResult> = await $host.get(url)
      return data
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  }
};
