import { useSelector } from "react-redux";
import {
  selectNumberQuestion,
  selectActiveQuestion,
  selectQuestionsLength,
} from "../../../store/ducks/quiz/selectors";
import {
  addAnswer,
  finishQuiz,
  nextQuestion,
} from "../../../store/ducks/quiz/slice";
import { useAppDispatch } from "../../../store/store";

export const useQuestion = () => {
  const dispatch = useAppDispatch();
  const numberQuestion = useSelector(selectNumberQuestion);
  const { rightAnswer, text, variants } = useSelector(
    selectActiveQuestion(numberQuestion)
  )!;
  const questionLength = useSelector(selectQuestionsLength);
  const onAnswer = (idAnswer: number) => () => {
    dispatch(
      addAnswer({
        idQuestion: numberQuestion,
        idAnswer,
        status: rightAnswer === idAnswer ? "success" : "error",
      })
    );
    if (numberQuestion === questionLength) {
      dispatch(finishQuiz());
      return;
    }
    dispatch(nextQuestion());
  };
  return {
    onAnswer,
    numberQuestion,
    questionLength,
    text,
    variants,
  };
};
