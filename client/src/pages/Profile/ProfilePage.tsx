import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import "./ProfilePage.scss";
import { useAppDispatch } from "../../store/store";
import { setNotIsAuth } from "../../store/ducks/user/slice";
import { IResultTest, ResultsApi } from "../../service/ResultsApi";
import { ILoadingStatus } from "../../store/types";
import { AppAlert } from "../../components/AppAlert/AppAlert";
import { Loader } from "../../components/Loader";
import { useModal } from "../../hooks/useModal";
import { ModalTable } from "./components/ModalTable";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../utils/routes";
import { ResultItem } from "./components/ResultItem";
interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { onShow } = useModal();
  const onLogout = () => {
    if (window.confirm("Вы уверены?")) {
      window.localStorage.removeItem("token");
      dispatch(setNotIsAuth());
    }
  };
  //TODO: Более подробнкю стату через модалку выводить,
  // там тупо таблицу попыток и колво правмильнх ответов и сдан ли ввобще тест и в это место иконку галочки или крестика !!!
  const [results, setResults] = useState<IResultTest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ILoadingStatus>(ILoadingStatus.NEVER);
  useEffect(() => {
    setStatus(ILoadingStatus.LOADING);
    const getResults = async () => {
      try {
        const results = await ResultsApi.getResultTest();
        console.log(results);
        setResults(results);
        setStatus(ILoadingStatus.SUCCESS);
      } catch (error) {
        setError(error.message);
        setStatus(ILoadingStatus.ERROR);
      }
    };
    getResults();
  }, []);

  return (
    <div className="profile">
      <Typography className="profile__title">Ваша статистика</Typography>
      {status === ILoadingStatus.ERROR ? (
        <AppAlert type="error" text={error || "Ошибка"} />
      ) : status === ILoadingStatus.LOADING ? (
        <Loader />
      ) : status === ILoadingStatus.SUCCESS ? (
        results?.length ? (
          <div className="profile__cards">
            {results.map(({ count, quiz, stat, successTry }) => (
              <ResultItem count={count} quiz={quiz} stat={stat} successTry={successTry} />
            ))}
          </div>
        ) : (
          <Typography>Вы не прошли ни одного теста</Typography>
        )
      ) : null}
      <Button variant="contained" onClick={onLogout}>
        Выйти из Аккаунта
      </Button>
    </div>
  );
};
