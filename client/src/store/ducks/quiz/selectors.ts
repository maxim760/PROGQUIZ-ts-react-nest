import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { IQuestion, IQuizState, ITestAnswer, ITestStatus } from "./types";

export const selectQuizState = (state: RootState) => state.quiz;
export const selectQuiz = (state: RootState) => selectQuizState(state).quiz;
export const selectQuestionsObject = createSelector(
  selectQuizState,
  (state) => {
    const test = state.quiz; //rootState.quiz.quiz
    if (!test) {
      return null;
    }
    const { questions } = test;
    return questions;
  }
);

export const selectQuestions = createSelector(
  selectQuestionsObject,
  (questions) => {
    return questions ? Object.values(questions) : null;
  }
);
export const selectQuestionsLength = (state: RootState) =>
  selectQuizState(state).quiz?.length ?? 0;

export const selectActiveQuestion = (id: number) => (state: RootState) =>
  selectQuizState(state).quiz?.questions[id] || null;
export const selectNumberQuestion = (state: RootState) =>
  selectQuizState(state).activeQuestion;

export const selectStatusTest = createSelector(selectQuizState, (state) => {
  const { status } = state;
  return {
    isNone: status === ITestStatus.NONE,
    isProgress: status === ITestStatus.PROGRESS,
    isFinish: status === ITestStatus.FINISH,
  };
});

export const selectTimeForTest = (state: RootState) => {
  const { startTime, finishTime } = selectQuizState(state);
  return finishTime - startTime;
};
export const selectQuizAnswers = (state: RootState) =>
  selectQuizState(state).answers;
export const selectErrorsFromTest = createSelector(
  selectQuestionsObject,
  selectQuizAnswers,
  (questions, answers) => {
    return answers.reduce(
      (acc: (IQuestion & { userAnswer: number })[], value) => {
        if (value.status !== "error") {
          return acc;
        }
        if (questions) {
          acc.push({
            ...questions[value.idQuestion],
            userAnswer: value.idAnswer,
          });
        }
        return acc;
      },
      []
    );
  }
);
