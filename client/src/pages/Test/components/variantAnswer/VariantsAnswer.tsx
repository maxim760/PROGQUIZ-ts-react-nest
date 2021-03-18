import {
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { AppCheckBox } from "../../../../components";
import { IVariant } from "../../../../store/ducks/quiz/types";

interface VariantsAnswerProps {
  variants: IVariant[];
  onClick?: (i: number) => () => void;
  userAnswer?: null | number;
  rightAnswer?: null | number;
  isFullShow?: boolean
}

export const VariantsAnswer: React.FC<VariantsAnswerProps> = ({
  variants,
  onClick,
  userAnswer = null,
  rightAnswer = null,
  isFullShow = false
}): React.ReactElement => {
  const isRight = userAnswer === rightAnswer && userAnswer !== null;
  const [isShowAnswer, setIsShowAnswer] = useState(false || isFullShow);
  const onToggleShowAnswer = () => setIsShowAnswer((prev) => !prev);

  return (
    <Box className="test__answers">
      {variants.map(({ text }, i) => (
        <Button
          key={i}
          className={[
            "test__answers-btn",
            isFullShow ? "test__answers--no-transition" : null ,
            userAnswer === i + 1 && !isRight ? "fail" : null,
            rightAnswer === i + 1 && isShowAnswer ? "success" : null,
          ].join(" ")}
          onClick={onClick ? onClick(i + 1) : undefined}
        >
          {text}
        </Button>
      ))}
      {userAnswer && (
        <>
          <AppCheckBox
            className="test__checkbox"
            checked={isShowAnswer}
            onChange={onToggleShowAnswer}
            text={"Показать правильный ответ"}
          />
          <Divider className={"test__divider"} />
        </>
      )}
    </Box>
  );
};
