import { ILoadingStatus } from "../../types";

export type IVariant = {
  text: string;
  _id: string;
};
export type IQuestion = {
  _id: number;
  text: string;
  variants: IVariant[];
  rightAnswer: number;
};

export enum ITestCategory {
  JS = "JS",
  PYTHON = "PYTHON",
  PHP = "PHP",
  HTML = "HTML",
}
export type ITest = {
  _id: string;
  category: ITestCategory;
  length: number;
  title: string;
  description: string;
  questions: { [key: number]: IQuestion };
  successResult: number;
};

export enum ITestStatus {
  NONE = "NONE",
  PROGRESS = "PROGRESS",
  FINISH = "FINISH",
}

export type ITestAnswer = {
  status: "success" | "error";
  idQuestion: number;
  idAnswer: number;
};

export type IQuizState = {
  quiz: ITest | null;
  activeQuestion: number;
  status: ITestStatus;
  answers: ITestAnswer[];
  startTime: number;
  finishTime: number;
  loadingStatus: ILoadingStatus;
  resultUrl: null | string;
  urlStatus: ILoadingStatus;
};
