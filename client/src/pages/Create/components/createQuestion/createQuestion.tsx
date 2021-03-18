import React from "react";
import "./createQuestion.scss";
import {
  Button,
  Typography,
} from "@material-ui/core";
import { useAppDispatch } from "../../../../store/store";
import { addQuestion } from "../../../../store/ducks/create/slice";
import { useSelector } from "react-redux";
import { selectCreateNumberQuest } from "../../../../store/ducks/create/selectors";
import { CreateQuestionItem } from "./CreateQuestionItem";
import "./createQuestion.scss";
import { ICreatedQuest } from "../../../../store/ducks/create/types";

interface IProps {
  onCreate(): void;
}

export const CreateQuestion: React.FC<IProps> = ({
  onCreate,
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const numberQuest = useSelector(selectCreateNumberQuest);
  const onCreateNewQuest = (data: ICreatedQuest) => {
    onCreate();
    dispatch(addQuestion(data));
  };

  return (
    <div className="create-question">
      <Typography>
        Вопрос <b>{numberQuest}</b>
      </Typography>
      <CreateQuestionItem onSubmit={onCreateNewQuest} isCreate>
        <Button
          type="submit"
          className="create-question__new"
          variant="contained"
          color="primary"
        >
          Добавить вопрос
        </Button>
      </CreateQuestionItem>
    </div>
  );
};
