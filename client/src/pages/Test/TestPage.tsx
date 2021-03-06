import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { selectQuiz, selectStatusTest } from "../../store/ducks/quiz/selectors";
import { fetchQuiz, resetTest, setQuiz } from "../../store/ducks/quiz/slice";
import { RootState } from "../../store/rootReducer";
import { useAppDispatch } from "../../store/store";
import { ILoadingStatus } from "../../store/types";
import { Finish } from "./components/Finish/Finish";
import { Question } from "./components/Question";
import { Start } from "./components/Start";
import "./TestPage.scss";
interface TestPageProps {}

export const TestPage: React.FC<TestPageProps> = ({}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams();
  const testId = params.id;
  const { isNone, isProgress, isFinish } = useSelector(selectStatusTest);
  // const quiz = useSelector(selectQuiz);
  const loadingStatus = useSelector(
    (state: RootState) => state.quiz.loadingStatus
  );
  useEffect(() => {
    dispatch(fetchQuiz(testId));
    return () => {
      dispatch(resetTest());
    };
  }, []);
  // if (!test) {
  //   return <h1>Неправильный адрес 404</h1>;
  // }
  if (loadingStatus === ILoadingStatus.LOADING) {
    return <Loader />;
  }
  if (loadingStatus === ILoadingStatus.ERROR) {
    return <h1>Неправильный адрес 404</h1>;
  }
  return (
    <Box className="test">
      {isNone ? (
        <Start />
      ) : isProgress ? (
        <Question />
      ) : isFinish ? (
        <Finish />
      ) : null}
    </Box>
  );
};
