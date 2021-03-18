import { debounce } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useChange } from "../../../hooks/useChange";
import { selectCategories, selectCategoriesStatus } from "../../../store/ducks/categories/selector";
import { fetchCategories } from "../../../store/ducks/categories/slice";
import { selectCreateCategory, selectCreateSuccessResult, selectCreateTitle, selectCreateDescription } from "../../../store/ducks/create/selectors";
import { setTitle, setDescription, setCategory, setSuccessResult, setTestChars } from "../../../store/ducks/create/slice";
import { useAppDispatch } from "../../../store/store";
import { ROUTE_NAMES } from "../../../utils/routes";

export const useStartPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const categories = useSelector(selectCategories);
  const testCategory = useSelector(selectCreateCategory)
  const percent = useSelector(selectCreateSuccessResult);
  const defaultTitle = useSelector(selectCreateTitle)
  const defaultDesc = useSelector(selectCreateDescription)
  const title = useChange(defaultTitle, (value: string) =>
    delayHandler(value, () => dispatch(setTitle(value)))
  );
  const description = useChange(defaultDesc, (value: string) =>
    delayHandler(value, () => dispatch(setDescription(value)))
  );
  const [error, setError] = useState<null | string>(null); 
  const { isError, isLoading } = useSelector(selectCategoriesStatus);
  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (error) {
      setError(error.message);
    }
  }, []);
  const onSelectCategory = (e: any, newValue: string | null) => {
    newValue && dispatch(setCategory(newValue));
  };

  const onChangePercent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (value > 100 || isNaN(value)) {
      return;
    }
    dispatch(setSuccessResult(value));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const testData = {
      successResult: percent,
      title: title.input.value,
      description: description.input.value,
      category: testCategory!,
    };
    dispatch(setTestChars(testData));
    history.push(ROUTE_NAMES.CREATE_MAIN);
  };

  const delayHandler = useCallback(debounce(
    <T,>(value: T, callback: (value: T) => void) => {
      callback(value);
    },
    500
  ), []);

  return {
    title: title.input,
    description: description.input,
    percent: {
      value: percent,
      onChange: onChangePercent
    },
    onSubmit,
    categories,
    category: {
      value: testCategory,
      onChange: onSelectCategory
    },
    error,
    status: {
      isError,
      isLoading
    }
  }
}