import { useEffect, useState } from 'react'
import { QuizApi } from '../../../service/QuizApi';
import { ITestFromServer } from '../../../store/ducks/quiz/saga';
import { ILoadingStatus } from '../../../store/types';
import {useAppDispatch} from "../../../store/store"
import { setCategories } from '../../../store/ducks/categories/slice';
export const useLoadTestList = () => {
  const dispatch = useAppDispatch()
  const [tests, setTests] = useState<ITestFromServer[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<ILoadingStatus>(
    ILoadingStatus.NEVER
  );
  const [curCategories, setCurCategories] = useState<string[]>([]);
  useEffect(() => {
    const getTests = async () => {
      setLoadingStatus(ILoadingStatus.LOADING);
      try {
        const tests = await QuizApi.getAll();
        if (tests) {
          setTests(tests);
          const categories = Array.from(new Set(tests.map((test) => test.category)))
          setCurCategories(categories)
          dispatch(setCategories(categories))
          
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
    categories: curCategories
  }
}
