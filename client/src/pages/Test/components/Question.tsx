import { Box, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "../TestPage.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  selectActiveQuestion,
  selectNumberQuestion,
  selectQuestionsLength,
  selectStatusTest,
} from "../../../store/ducks/quiz/selectors";
import {
  addAnswer,
  finishQuiz,
  nextQuestion,
} from "../../../store/ducks/quiz/slice";
import { VariantsAnswer } from "./variantAnswer/VariantsAnswer";

export const Question: React.FC = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const numberQuestion = useSelector(selectNumberQuestion);
  const activeQuestion = useSelector(selectActiveQuestion(numberQuestion));
  const questionLength = useSelector(selectQuestionsLength);
  if (!activeQuestion) {
    return null;
  }
  const { rightAnswer, text, variants } = activeQuestion;
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
  return (
    <>
      <Typography className="test__question">{text}</Typography>
      <Typography className="test__question-info">
        {numberQuestion} / {questionLength}
      </Typography>
      <Box className="test__answers">
        <VariantsAnswer variants={variants} onClick={onAnswer} />
      </Box>
    </>
  );
};
