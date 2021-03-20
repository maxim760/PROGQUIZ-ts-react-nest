import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppAlert, AppCheckBox } from "../../components";
import {
  selectCreateIsAllCharsFilled,
  selectCreateQuestions,
  selectCreateStatus,
  selectCurrentQuestionIdx,
} from "../../store/ducks/create/selectors";
import { ROUTE_NAMES } from "../../utils/routes";
import { CreateQuestion } from "./components/createQuestion/createQuestion";
import { Questions } from "./components/Questions/Questions";
import LeftIcon from "@material-ui/icons/ArrowBackIos";
import RightIcon from "@material-ui/icons/ArrowForwardIos";
import "./create.scss";
import { QuestionsItem } from "./components/Questions/QuestionsItem";
import { fetchCreateTest, resetCreateTest } from "../../store/ducks/create/slice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";

type IPaginate = {
  to: "prev" | "next";
  isNew?: boolean;
  isRemove?: boolean;
};

export const CreateMainPage: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const questionIdxCreate = useSelector(selectCurrentQuestionIdx);
  const questions = useSelector(selectCreateQuestions);
  const isAllCharsFilled = useSelector(selectCreateIsAllCharsFilled);
  const [isShowAllQuests, setIsShowAllQuests] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionIdxCreate);
  const isNextArrow = currentQuestion < questionIdxCreate;
  const isPrevArrow = currentQuestion > 0;
  const { error, url, isError, isLoading, isNever, isSuccess } = useSelector(
    selectCreateStatus
  );
  const onNewTest = () => {
    dispatch(resetCreateTest())
    history.replace(ROUTE_NAMES.CREATE_START)
  };
  const toggleShowAllQuests = () => {
    setIsShowAllQuests((prev) => {
      if (!prev) {
        // если показываю все вопросы, то отображть в конце нужно форму создания а не вопрос который был
        setCurrentQuestion(questionIdxCreate);
      }
      return !prev;
    });
  };
  useEffect(() => {
    if (!isAllCharsFilled) {
      history.replace(ROUTE_NAMES.CREATE_START);
    }
    // return () => dispatch(setCreateStatus(ILoadingStatus.NEVER))
  }, []);
  const onAddTest = () => {
    if (questions.length && window.confirm("Вы уверены?")) {
      dispatch(fetchCreateTest());
    }
  };
  const onPaginate = ({ to, isNew, isRemove }: IPaginate) => () => {
    !isNew && !isRemove && setIsShowAllQuests(false);
    if (to === "prev") {
      isPrevArrow && setCurrentQuestion((prev) => prev - 1);
    } else {
      (isNextArrow || isNew) && setCurrentQuestion((prev) => prev + 1);
    }
  };
  const onCreateQuestion = onPaginate({ to: "next", isNew: true });
  const onBackRemove = onPaginate({to: "prev", isRemove: true})
  if (isSuccess) {
    return (
      <div className="create-question create-question--success">
        <Typography className="create-question__title">
          Вы успешно создали тест!
        </Typography>
        <Card className="create-question__card" >
          <Typography variant="subtitle1">
            Перейдите по <Link to={ROUTE_NAMES.TEST + url!}>ссылке</Link>, чтобы пройти свой тест
          </Typography>
        </Card>
        <Button variant="contained" color="primary" onClick={onNewTest}>
          Создать новый тест
        </Button>
      </div>
    );
  }
  return (
    <div className="create-question create-question--wrapper">
      <IconButton
        onClick={onPaginate({to:"prev"})}
        disabled={!isPrevArrow}
        className="create-question__arrow create-question__arrow--left"
      >
        <LeftIcon />
      </IconButton>
      <IconButton
        onClick={onPaginate({ to: "next" })}
        disabled={!isNextArrow}
        className="create-question__arrow create-question__arrow--right"
      >
        <RightIcon />
      </IconButton>
      <Typography variant="h3" className="create-question__title">
        Вопросы
      </Typography>
      {questions.length ? (
        <AppCheckBox
          text="Показать все вопросы"
          checked={isShowAllQuests}
          onChange={toggleShowAllQuests}
        />
      ) : null}
      {isShowAllQuests ? <Questions questions={questions} onBack={onBackRemove} /> : null}
      {questionIdxCreate === currentQuestion ? (
        <CreateQuestion onCreate={onCreateQuestion} />
      ) : (
        <QuestionsItem {...questions[currentQuestion]} onBack={onBackRemove} />
      )}
      <Button
        disabled={!questions.length || isLoading}
        variant="contained"
        color="primary"
        onClick={onAddTest}
      >
        {isLoading ? <CircularProgress size={28} /> : "Добавить тест"}
      </Button>
      {isError ? (
        <AppAlert text={error || "Ошибка"} type="error" isCanClose />
      ) : null}
    </div>
  );
};
