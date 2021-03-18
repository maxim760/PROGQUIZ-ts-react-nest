import { statusToObj } from "../../../utils/statusToObj";
import { RootState } from "../../rootReducer";

export const selectCreateState = (state: RootState) => state.create;
export const selectCreateQuestions = (state: RootState) => selectCreateState(state).questions;
export const selectCreateTitle = (state: RootState) => selectCreateState(state).title;
export const selectCreateDescription = (state: RootState) => selectCreateState(state).description;
export const selectCreateSuccessResult = (state: RootState) => selectCreateState(state).successResult;
export const selectCreateCategory = (state: RootState) => selectCreateState(state).category;
export const selectCreatedTest = (state: RootState) => {
  const { error, createStatus,url, ...test } = selectCreateState(state)
  return test
}
export const selectCreateChars = (state: RootState) => {
  const { questions, ...chars } = selectCreatedTest(state)
  return chars
};
// текущий создающийся вопрос
export const selectCurrentQuestionIdx = (state: RootState) => selectCreateQuestions(state).length

export const selectCreateIsAllCharsFilled = (state: RootState) => {
  const chars = selectCreateChars(state)
  return Object.values(chars).every(char => char)
};

export const selectCreateQuestionById = (id?: string) => (state: RootState) => {
  if (!id) {
    return undefined
  }
  const questions = selectCreateQuestions(state)
  return questions.find(q => q.id === id)
}

export const selectCreateNumberQuest = (state: RootState) => selectCreateState(state).questions.length + 1

export const selectCreateStatus = (state: RootState) => {
  const {createStatus, error, url} = selectCreateState(state)
  return {...statusToObj(createStatus), error, url}
}
