import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectStatusTest, selectQuizLoading } from "../../../store/ducks/quiz/selectors";
import { fetchQuiz, resetTest } from "../../../store/ducks/quiz/slice";
import { useAppDispatch } from "../../../store/store";

export const useLoadTest = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams();
  const testId = params.id;
  const testStatus = useSelector(selectStatusTest);
  const loadingStatus = useSelector(selectQuizLoading);
  useEffect(() => {
    dispatch(fetchQuiz(testId));
    return () => {
      dispatch(resetTest());
    };
  }, []);
  return {
    testStatus,
    loadingStatus,
  }
};
