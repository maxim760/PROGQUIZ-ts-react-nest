import { $authHost, $host } from ".";
import { ICreatedTest, ICreateState } from "../store/ducks/create/types";
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
  },
  async getCategories(): Promise<string[]> {
    try {
      const {data}: IServerData<string[]> = await $host.get("/quiz/category") 
      return data
    } catch (error) {
      throw new Error(error.response.data.message || error.message); 
    }
  },
  async create(test: ICreatedTest): Promise<string> {
    try {
      const { data }: IServerData<string> = await $authHost.post("/quiz", test)
      console.log(data)
      return data
    } catch (error) {
      throw new Error(error.response.data.message || error.message)
    }
      
  }
}