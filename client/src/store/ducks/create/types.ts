import { ILoadingStatus } from "../../types";
import { IQuestion } from "../quiz/types";

export type ICreatedQuest = Omit<IQuestion, "_id"> & { id: string };


export type ICreateState = {
  category: string;
  title: string;
  description: string;
  questions: ICreatedQuest[] ;
  successResult: number;
  createStatus: ILoadingStatus;
  error: string | null;
  url: string | null
};

export type ICreatedTest = {
  category: string;
  title: string;
  description: string;
  questions: ICreatedQuest[] ;
  successResult: number;
}
export type IChars = Omit<ICreatedTest, "questions">