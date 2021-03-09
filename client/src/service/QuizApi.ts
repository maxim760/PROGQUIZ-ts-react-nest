import axios from "axios"
import { $host } from ".";
import { ITestFromServer } from "../store/ducks/quiz/saga";

export type IServerData<T> = {
  data: T
}

export const QuizApi = {
  async getOne(id: string): Promise<ITestFromServer> {
    try {
      const { data }: IServerData<ITestFromServer> = await $host.get(`/quiz/${id}`)
      return data
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
      
    }
  },
  async getAll(): Promise<ITestFromServer[]> {
    try {
      const {data}: IServerData<ITestFromServer[]> = await $host.get("/quiz") 
      return data
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
      
    }

  }
}