import { Card, Typography, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import { IStat, ISuccessTry } from "../../../service/ResultsApi";
import { ITest } from "../../../store/ducks/quiz/types";
import { ROUTE_NAMES } from "../../../utils/routes";
import { ModalTable } from "./ModalTable";

interface ResultItemProps {
  count: number;
  quiz: ITest;
  stat: IStat[];
  successTry: ISuccessTry;
}

export const ResultItem: React.FC<ResultItemProps> = ({
  count,
  quiz,
  stat,
  successTry,
}): React.ReactElement => {
  const { isVisible, onShow, onHide } = useModal();

  return (
    <Card className="profile__card">
      <Typography className="profile__name">
        <b>{quiz.category}</b>:
        <Link to={ROUTE_NAMES.TEST + quiz._id} className="profile__link">
          {quiz.title}
        </Link>
      </Typography>
      <div className="profile__result-info">
        {successTry.isSuccess ? (
          <>
            <span className="profile__is-passed success">
              Тест сдан с {successTry.numberTry} попытки!
            </span>
            <span className="profile__emoji">🥳</span>
          </>
        ) : (
          <>
            <span className="profile__is-passed fail">
              К сожалению, тест не сдан
            </span>
            <span className="profile__emoji">😥</span>
          </>
        )}
      </div>
      <Typography>Всего попыток: {count}</Typography>
      <Button onClick={onShow} variant="contained" color="primary">
        Подробнее
      </Button>
      {isVisible ? (
        <ModalTable
          onClose={onHide}
          isVisible={isVisible}
          stat={stat}
          successPercent={quiz.successResult}
        />
      ) : null}
    </Card>
  );
};
