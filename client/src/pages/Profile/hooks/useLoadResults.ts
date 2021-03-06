import { useEffect, useState } from 'react'
import { IResultTest, ResultsApi } from '../../../service/ResultsApi';
import { ILoadingStatus } from '../../../store/types';
import { statusToObj } from '../../../utils/statusToObj';

export const useLoadResults = () => {
  const [results, setResults] = useState<IResultTest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ILoadingStatus>(ILoadingStatus.LOADING);
  useEffect(() => {
    const getResults = async () => {
      try {
        const results = await ResultsApi.getResultsTest();
        setResults(results);
        setStatus(ILoadingStatus.SUCCESS);
      } catch (error) {
        setError(error.message);
        setStatus(ILoadingStatus.ERROR);
      }
    };
    getResults();
  }, []);
  return {
    results,
    error,
    status: statusToObj(status)
  }
}
