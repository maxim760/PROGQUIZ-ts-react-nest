import { Box, Typography } from "@material-ui/core";
import React from "react";
import "../TestPage.scss";

import { VariantsAnswer } from "./variantAnswer/VariantsAnswer";
import { useQuestion } from "../hooks/useQuestion";

export const Question: React.FC = (): React.ReactElement | null => {
  const { onAnswer , text, variants, numberQuestion, questionLength} = useQuestion()
  return (
    <>
      <Typography className="test__question">{text}</Typography>
      <Typography className="test__question-info">
        {numberQuestion} / {questionLength}
      </Typography>
      <Box className="test__answers">
        <VariantsAnswer variants={variants} onClick={onAnswer} />
      </Box>
    </>
  );
};
