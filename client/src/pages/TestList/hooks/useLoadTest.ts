import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { QuizApi } from '../../../service/QuizApi';
import { ITestFromServer } from '../../../store/ducks/quiz/saga';
import { ILoadingStatus } from '../../../store/types';

export const useLoadTest = () => {
  const [tests, setTests] = useState<ITestFromServer[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<ILoadingStatus>(
    ILoadingStatus.NEVER
  );
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const getTests = async () => {
      setLoadingStatus(ILoadingStatus.LOADING);
      try {
        const tests = await QuizApi.getAll();
        if (tests) {
          setTests(tests);
          setCategories(
            Array.from(new Set(tests.map((test) => test.category)))
          );
        }
        setLoadingStatus(ILoadingStatus.SUCCESS);
      } catch (error) {
        setLoadingStatus(ILoadingStatus.ERROR);
      }
    };
    getTests();
  }, []);
  return {
    loadingStatus,
    tests,
    categories
  }
}
