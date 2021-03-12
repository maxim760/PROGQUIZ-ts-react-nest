import React from "react";
import { Box } from "@material-ui/core";
import { Loader } from "../../components";
import { Finish } from "./components/Finish/Finish";
import { Question } from "./components/Question";
import { Start } from "./components/Start";
import { useLoadTest } from "./hooks/useLoadTest";
import "./TestPage.scss";
interface TestPageProps {}

export const TestPage: React.FC<TestPageProps> = ({}): React.ReactElement => {
  const { testStatus, loadingStatus } = useLoadTest()
  if (loadingStatus.isError) {
    return <h1>Неправильный адрес</h1>;
  }
  if (loadingStatus.isLoading || loadingStatus.isNever) {
    return <Loader />;
  }
  return (
    <Box className="test">
      {testStatus.isNone ? (
        <Start />
      ) : testStatus.isProgress ? (
        <Question />
      ) : testStatus.isFinish ? (
        <Finish />
      ) : null}
    </Box>
  );
};
