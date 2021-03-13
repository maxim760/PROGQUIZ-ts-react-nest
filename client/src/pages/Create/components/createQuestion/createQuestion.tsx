import React, { useState } from "react";
import PlusIcon from "@material-ui/icons/AddCircleOutline";
import MinusIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import "./createQuestion.scss";
import { Button, TextField, Typography } from "@material-ui/core";
import { nanoid } from "nanoid";
import { useChange } from "../../../../hooks/useChange";
import { AppCheckBox } from "../../../../components";
interface CreateQuestionProps {
  onCreateNewQuest(): void;
}

const MAX_ANSW = 6;
const MIN_ANSW = 2;

export const CreateQuestion: React.FC<CreateQuestionProps> = ({onCreateNewQuest}): React.ReactElement => {
  const question = useChange();
  const [answers, setAnswers] = useState([
    { value: "", id: "1" },
    { value: "", id: "2" },
  ]);
  const onPlusAns = () => {
    answers.length <= MAX_ANSW &&
      setAnswers((prev) => [...prev, { value: "", id: nanoid() }]);
  };
  const onMinusAns = () => {
    answers.length >= MIN_ANSW &&
      setAnswers((prev) => prev.slice(0, prev.length - 1));
  };
  const onChangeAnswer = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnswers((prev) =>
      prev.map((ans) => {
        if (ans.id === id) {
          ans.value = event.target.value;
        }
        return ans;
      })
    );
  };
  //TODO: новые страницы для создания теста (начальная настройка, сами вопросы)
  //TODO и встарнице вопросов проверять что типа если не задана тема и процент то хистропи пуш на страницу настроек
  //TODO: все сохранять в редакс и в локал сторадж
  //TODO: после сощдания теста локал сторажд чистить 
  return (
    <form className="create-question">
      <TextField
        required
        className="create-question__question"
        label="Введите вопрос"
        {...question}
        multiline
      />
      <div className="create-question__header">
        <IconButton
          color="primary"
          className="create-question__icon-button"
          disabled={MIN_ANSW >= answers.length}
        >
          <MinusIcon className="create-question__icon" onClick={onMinusAns} />
        </IconButton>
        <Typography className="create-question__title">
          Выберите количество ответов
        </Typography>
        <IconButton
          color="primary"
          className="create-question__icon-button"
          disabled={MAX_ANSW <= answers.length}
        >
          <PlusIcon className="create-question__icon" onClick={onPlusAns} />
        </IconButton>
      </div>
      <div className="create-question__answers">
        {answers.map(({value, id }) => (
          <TextField
            required
            key={id}
            value={value}
            onChange={onChangeAnswer(id)}
            variant={"outlined"}
          />
        ))}
      </div>
      <Button type="submit" variant="contained" color="primary" onClick={onCreateNewQuest}>
        Новый вопрос
      </Button>
    </form>
  );
};
