import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useChange } from "../../../hooks/useChange";
import { selectCreateQuestionById } from "../../../store/ducks/create/selectors";
import { ICreatedQuest } from "../../../store/ducks/create/types";
import { MAX_ANSWERS, MIN_ANSWERS } from "../../../utils/consts";

type IProps = {
  id?: string,
  isCreate: boolean,
  onSubmit: (data: ICreatedQuest) => void
}

const initialVars = [
  { text: "", _id: "1" },
  { text: "", _id: "2" },
];

const initQuestCreate: ICreatedQuest = {
  variants: initialVars,
  rightAnswer: 1,
  text: "",
  id: "1",
};

export const useCreateQuestion = ({isCreate, id, onSubmit}: IProps) => {
  
  const editQuestionById = useSelector(selectCreateQuestionById(id));
  const initQuest = isCreate ? initQuestCreate : editQuestionById!;
  const question = useChange(initQuest.text);
  const [variants, setVariants] = useState(initQuest.variants);
  const isMinus = variants.length > MIN_ANSWERS
  const isPlus = variants.length < MAX_ANSWERS
  const [rightAnswer, setRightAnswer] = useState<number>(initQuest.rightAnswer);
  const onChangeAnswer = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariants((prev) => {
      const idx = prev.findIndex((v) => v._id === id);
      return [
        ...prev.slice(0, idx),
        { ...prev[idx], text: event.target.value },
        ...prev.slice(idx + 1),
      ];
    });
  };
  const clearFields = () => {
    question.reset();
    setVariants(initialVars);
    setRightAnswer(1);
  };
  const onPlus = () => {
    isPlus &&
      setVariants((prev) => [...prev, { text: "", _id: nanoid() }]);
  };
  const minusAnswer = () => setVariants((prev) => prev.slice(0, prev.length - 1));
  const onMinus = () => {
    const len = variants.length
    if (isMinus) {
      if (variants[len - 1].text.trim()) {
        window.confirm("Вы уверены") && minusAnswer()
        return
      }
      minusAnswer()
    }
  };
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (variants.length === new Set(variants.map(v => v.text.trim().toLowerCase())).size) {
      isCreate && clearFields();
      onSubmit({
        variants,
        text: question.input.value,
        rightAnswer,
        id: isCreate ? nanoid() : id!,
      });
    } else {
      alert("Варианты ответов не могут совпадать")
    }

  };

  const onSelectAns = (e: React.ChangeEvent<{ value: unknown }>) => {
    setRightAnswer(+(e.target.value as string));
  };

  return {
    actions: {
      onSubmitForm,
      onMinus,
      onPlus,
      onChangeAnswer,
      onSelectAns
    },
    data: {
      variants,
      rightAnswer,
      question: question.input
    },
    status: {
      isMinus,
      isPlus
    }
  }

}