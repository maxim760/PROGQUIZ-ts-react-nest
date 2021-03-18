import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppDispatch } from "../../../../store/store";
import { ICreatedQuest } from "../../../../store/ducks/create/types";
import { updateQuestion } from "../../../../store/ducks/create/slice";
import { CreateQuestionItem } from "../createQuestion/CreateQuestionItem";

interface ModalEditProps {
  isVisible: boolean;
  onClose(): void;
  id: string;
}

export const EditModal: React.FC<ModalEditProps> = ({
  isVisible,
  onClose,
  id,
}): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  
  const onSubmit = (data: ICreatedQuest) => {
    dispatch(updateQuestion(data));
    onClose();
  };

  if (!isVisible) {
    return null;
  }


  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Измените вопрос</DialogTitle>
      <DialogContent className="share__content">
        <CreateQuestionItem onSubmit={onSubmit} id={id}>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Закрыть
            </Button>
            <Button type="submit" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </CreateQuestionItem>
      </DialogContent>
    </Dialog>
  );
};
