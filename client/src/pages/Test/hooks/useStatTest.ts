import React from 'react'
import { useSelector } from 'react-redux';
import { selectErrorsFromTest, selectPercentTest, selectQuestionsLength, selectQuizSuccessPercent, selectTimeForTest } from '../../../store/ducks/quiz/selectors';

export const useStatTest = () => {
  const time = useSelector(selectTimeForTest);
  const errors = useSelector(selectErrorsFromTest);
  const percentForSuccess = useSelector(selectQuizSuccessPercent);
  const questionsLength = useSelector(selectQuestionsLength);
  const percentTest = useSelector(selectPercentTest)
  return {
    time, 
    errors, 
    questionsLength,
    rightAnswersLength: questionsLength - errors.length,
    percentForSuccess,
    percentTest
  }
}
