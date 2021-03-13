import { Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppAlert, Loader } from "../../components";
import {
  selectCategories,
  selectCategoriesStatus,
} from "../../store/ducks/categories/selector";
import { fetchCategories } from "../../store/ducks/categories/slice";
import { useAppDispatch } from "../../store/store";
import { CreateQuestion } from "./components/createQuestion/createQuestion";
import "./create.scss";

export const CreatePage: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState([])
  const categories = useSelector(selectCategories);
  const [testCategory, setTestCategory] = useState<null | string>(null);
  const [percent, setPercent] = useState(80);
  const [error, setError] = useState<null | string>(null);
  const { isError, isLoading, isSuccess } = useSelector(selectCategoriesStatus);
  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (error) {
      setError(error.message);
    }
  }, []);
  const onSelectCategory = (event: any, newValue: string | null) => {
    setTestCategory(newValue);
  };

  const onChangePercent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (value > 100 || isNaN(value)) {
      return;
    }
    setPercent(value);
  };

  if (isError) {
    return <AppAlert text={error || "Ошибка"} type="error" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="create">
      <Typography variant="h2">Создайте тест</Typography>
      <Typography>Выберите тему теста</Typography>
      <Autocomplete
        value={testCategory}
        options={categories}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        autoHighlight
        onChange={onSelectCategory}
        noOptionsText="Не найдено"
        renderInput={(params) => (
          <TextField {...params} label="Тема теста" variant="outlined" />
          )}
          />
      <label
          className="create__input-percent"
      
      >
        Процент решенных заданий, чтобы считать тест пройденным
        <TextField
          className="create__percent"
          type="text"
          value={percent}
          onChange={onChangePercent}
        />
        %
      </label>
      <CreateQuestion onCreateNewQuest={() => {}} />
    </div>
  );
};
