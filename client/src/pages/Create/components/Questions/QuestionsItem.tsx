import { Divider, Typography } from "@material-ui/core";
import React from "react";
import { useModal } from "../../../../hooks/useModal";
import { IVariant } from "../../../../store/ducks/quiz/types";
import { VariantsAnswer } from "../../../Test/components/variantAnswer/VariantsAnswer";
import { AppMenu } from "../AppMenu/AppMenu";
import { EditModal } from "../editModal/EditModal";

interface QuestionsItemProps {
  text: string,
  variants: IVariant[],
  rightAnswer: number,
  id: string,
  onBack: () => void
}

export const QuestionsItem: React.FC<QuestionsItemProps> = ({ text, variants, rightAnswer, id, onBack }): React.ReactElement => {
  const { isVisible, onShow, onHide} = useModal()
  return (
    <div className="create__ready-quest">
      <Typography>{text}</Typography>
      <AppMenu className="create__menu" onEdit={onShow} onBack={onBack} id={id} />
      <VariantsAnswer
        variants={variants}
        rightAnswer={rightAnswer}
        isFullShow
      />
      <Divider className="create__divider" />
      <EditModal isVisible={isVisible} onClose={onHide} id={id} />
    </div>
  );
};
