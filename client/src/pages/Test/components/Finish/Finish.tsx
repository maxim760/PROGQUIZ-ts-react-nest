import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  selectErrorsFromTest,
  selectQuestionsLength,
  selectTimeForTest,
} from "../../../../store/ducks/quiz/selectors";
import { resetTest } from "../../../../store/ducks/quiz/slice";
import { RootState } from "../../../../store/rootReducer";
import { useAppDispatch } from "../../../../store/store";
import { getCountForSuccess } from "../../../../utils/getCountForSuccess";
import { getTime } from "../../../../utils/getTime";
import { VariantsAnswer } from "../variantAnswer/VariantsAnswer";
import "./finish.scss";

export const Finish: React.FC = ({}): React.ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const time = useSelector(selectTimeForTest);
  const errors = useSelector(selectErrorsFromTest);
  const successResult = useSelector(
    (state: RootState) => state.quiz.quiz?.successResult ?? 0
  );
  const questionsLength = useSelector(selectQuestionsLength);
  const rightAnswersLength = questionsLength - errors.length;
  const [isShowErrors, setIsShowErrors] = useState(false);
  const onToggleShowErrors = () => setIsShowErrors((prev) => !prev);
  const onGoToStart = () => dispatch(resetTest());
  const onGoToMainPage = () => history.push("/");
  return (
    <div className="finish">
      <h1>Конец</h1>
      <h1>Время: {getTime(time)}</h1>
      <div>
        Количество верных ответов: {rightAnswersLength} / {questionsLength}
      </div>
      <div>ошибки в вопросах: {errors.map(er => er._id).join(", ")}</div>
      <div className="finish__result">
        {rightAnswersLength / questionsLength >= successResult
          ? "Вы успешно прошли тест."
          : "Вы не прошли тест. Попробуйте ещё"}
      </div>
      <div className="finish__btnsWrapper">
        <Button
          color="primary"
          className="finish__navButton"
          onClick={onGoToMainPage}
          variant="contained"
        >
          На страницу тестов
        </Button>
        <Button
          color="primary"
          className="finish__navButton"
          variant="contained"
          onClick={onGoToStart}
        >
          Начать заново
        </Button>
      </div>
      <Button
        color="primary"
        variant="contained"
        className="finish__errorButton"
        onClick={onToggleShowErrors}
      >
        {isShowErrors ? "Скрыть" : "Показать"} ошибки
      </Button>
      {isShowErrors
        ? errors.map(({text, ...variantsProps}) => (
            <React.Fragment key={variantsProps._id}>
              <h1>{text}</h1>
              <VariantsAnswer {...variantsProps} />
            </React.Fragment>
        ))
        : null
      }
    </div>
  );
};
