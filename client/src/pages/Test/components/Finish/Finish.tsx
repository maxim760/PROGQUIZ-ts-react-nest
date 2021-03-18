import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { resetTest } from "../../../../store/ducks/quiz/slice";
import { useAppDispatch } from "../../../../store/store";
import { getTime } from "../../../../utils/getTime";
import { useShowErrors } from "../../hooks/useShowErrors";
import { useStatTest } from "../../hooks/useStatTest";
import { VariantsAnswer } from "../variantAnswer/VariantsAnswer";
import "./finish.scss";

import { useModal } from "../../../../hooks/useModal";
import { ModalShare } from "../ModalShare/ModalShare";

export const Finish: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {isVisible, onShow, onHide} = useModal()
  const {
    time,
    rightAnswersLength,
    questionsLength,
    percentForSuccess,
    percentTest,
    errors,
  } = useStatTest();
  const { onToggle, isShow } = useShowErrors();
  const onGoToStart = () => dispatch(resetTest());
  const onGoToMainPage = () => history.push("/");
  return (
    <div className="finish">
      <h1>Конец</h1>
      <h1>Время: {getTime(time)}</h1>
      <div>
        Количество верных ответов: {rightAnswersLength} / {questionsLength}
      </div>
      {errors.length ? (
        <div>ошибки в вопросах: {errors.map((er) => er._id).join(", ")}</div>
      ) : null}
      <div className="finish__result">
        {percentTest >= percentForSuccess
          ? "Вы успешно прошли тест."
          : "Вы не прошли тест. Попробуйте ещё"}
      </div>
      <div className="finish__btnsWrapper">
        <Button
          className="finish__navButton"
          onClick={onGoToMainPage}
          variant="contained"
        >
          На страницу тестов
        </Button>
        <Button
          className="finish__navButton"
          variant="contained"
          onClick={onGoToStart}
        >
          Начать заново
        </Button>
        <Button
          className="finish__navButton"
          variant="contained"
          onClick={onShow}
        >
          Поделиться
        </Button>
      </div>

      {errors.length ? (
        <Button
          color="primary"
          variant="contained"
          className="finish__errorButton"
          onClick={onToggle}
        >
          {isShow ? "Скрыть ошибки" : "Показать ошибки"}
        </Button>
      ) : null}
      {isShow
        ? errors.map(({ text, ...variantsProps }) => (
            <React.Fragment key={variantsProps._id}>
              <h1>{text}</h1>
              <VariantsAnswer {...variantsProps} />
            </React.Fragment>
          ))
        : null}
      <ModalShare isVisible={isVisible} onClose={onHide} />
    </div>
  );
};
