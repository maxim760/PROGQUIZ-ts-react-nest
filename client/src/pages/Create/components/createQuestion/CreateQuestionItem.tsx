import {
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { nanoid } from "nanoid";
import React from "react";
import PlusIcon from "@material-ui/icons/AddCircleOutline";
import MinusIcon from "@material-ui/icons/RemoveCircleOutline";
import { ICreatedQuest } from "../../../../store/ducks/create/types";
import "./createQuestion.scss";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";

interface CreateQuestionItemProps {
  children: any;
  onSubmit: (data: ICreatedQuest) => void;
  isCreate?: boolean;
  id?: string;
}

export const CreateQuestionItem: React.FC<CreateQuestionItemProps> = ({
  children,
  onSubmit,
  isCreate = false,
  id,
}): React.ReactElement => {
  
  const {actions, data, status} = useCreateQuestion({isCreate, id, onSubmit})

  return (
    <form className="create-question" onSubmit={actions.onSubmitForm}>
      <TextField
        required
        className="create-question__question"
        label="Введите вопрос"
        {...data.question}
        multiline
      />
      <div className="create-question__header">
        <IconButton
          color="primary"
          className="create-question__icon-button"
          disabled={!status.isMinus}
          onClick={actions.onMinus}
        >
          <MinusIcon className="create-question__icon" />
        </IconButton>
        <Typography>
          Выберите количество ответов
        </Typography>
        <IconButton
          color="primary"
          className="create-question__icon-button"
          disabled={!status.isPlus}
          onClick={actions.onPlus}
        >
          <PlusIcon className="create-question__icon" />
        </IconButton>
      </div>
      <div className="create-question__answers">
        {data.variants.map(({ text, _id }) => (
          <TextField
            required
            key={_id}
            value={text}
            onChange={actions.onChangeAnswer(_id)}
            variant={"outlined"}
            multiline 
          />
        ))}
      </div>
      <div className="create-question__footer">
        <FormControl required
        >
          <InputLabel htmlFor="age-native-required">Верный ответ</InputLabel>
          <Select
            native
            value={data.rightAnswer}
            name="variant"
            onChange={actions.onSelectAns}
          >
            {Array.from({ length: data.variants.length }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </FormControl>
        {children}
      </div>
    </form>
  );
};
