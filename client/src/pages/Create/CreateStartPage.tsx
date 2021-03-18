import { Typography, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { AppAlert, Loader } from "../../components";

import "./create.scss";
import { useStartPage } from "./hooks/useStartPage";

export const CreateStartPage: React.FC = (): React.ReactElement => {
  const {status, error, onSubmit, categories, title, description, percent,category} = useStartPage()

  if (status.isError) {
    return <AppAlert text={error || "Ошибка"} type="error" />;
  }

  if (status.isLoading) {
    return <Loader />;
  }
  return (
    <form className="create" onSubmit={onSubmit}>
      <Typography variant="h2">Создайте тест</Typography>
      <Typography>Выберите тему теста</Typography>
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        autoHighlight
        noOptionsText="Не найдено"
        {...category}
        renderInput={(params) => (
          <TextField
            {...params}
            required={true}
            label="Тема теста"
            variant="outlined"
          />
        )}
      />
      <label className="create__input-percent">
        Процент решенных заданий, чтобы считать тест пройденным
        <TextField
          className="create__percent"
          type="text"
          {...percent}
        />
        %
      </label>
      <TextField className="create__input" required label="Название теста" {...title} />
      <TextField
        required
        label="Описание теста"
        multiline
        className="create__input"
        {...description}
      />
      <Button className="create__btn-start" color="primary" variant="contained" type="submit">
        Перейти к созданию теста
      </Button>
    </form>
  );
};
