import React from "react";
import { ICreatedQuest } from "../../../../store/ducks/create/types";
import { QuestionsItem } from "./QuestionsItem";

interface QuestionsProps {
  questions: ICreatedQuest[];
  onBack(): void
}

export const Questions: React.FC<QuestionsProps> = ({
  questions, onBack
}): React.ReactElement => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionsItem {...question} key={question.id} onBack={onBack} />
      ))}
    </div>
  );
};
