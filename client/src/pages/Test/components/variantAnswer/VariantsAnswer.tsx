import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import { AppCheckBox } from "../../../../components/AppCheckBox/AppCheckbox";
import { IVariant } from "../../../../store/ducks/quiz/types";

interface VariantsAnswerProps {
  variants: IVariant[];
  onClick?: (i: number) => () => void;
  userAnswer?: null | number;
  rightAnswer?: null | number;
}

export const VariantsAnswer: React.FC<VariantsAnswerProps> = ({
  variants,
  onClick,
  userAnswer = null,
  rightAnswer = null,
}): React.ReactElement => {
  const isRight = userAnswer === rightAnswer && userAnswer !== null;
  const [isShowAnswer, setIsShowAnswer] = React.useState(false);
  const onToggleShowAnswer = () => setIsShowAnswer((prev) => !prev);

  return (
    <Box className="test__answers">
      {variants.map(({ text }, i) => (
        <Button
          key={i}
          className={[
            "test__answers-btn",
            userAnswer === i + 1 && !isRight ? "fail" : "",
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
