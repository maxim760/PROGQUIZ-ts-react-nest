import React from "react";
import { Button, Typography } from "@material-ui/core";
import "./ProfilePage.scss";
import { AppAlert, Loader } from "../../components";
import { ResultItem } from "./components/ResultItem";
import { useAuth } from "../../hooks/useAuth";
import { useLoadResults } from "./hooks/useLoadResults";

export const ProfilePage: React.FC = (): React.ReactElement => {
  const { onLogout } = useAuth();
  const { results, error, status } = useLoadResults();

  return (
    <div className="profile">
      <Typography className="profile__title">Ваша статистика</Typography>
      {status.isError ? (
        <AppAlert type="error" text={error || "Ошибка"} />
      ) : status.isLoading ? (
        <Loader />
      ) : results?.length ? (
        <div className="profile__cards">
          {results.map(({ count, quiz, stat, successTry }, i) => (
            <ResultItem
              key={i}
              count={count}
              quiz={quiz}
              stat={stat}
              successTry={successTry}
            />
          ))}
        </div>
      ) : (
        <Typography>Вы не прошли ни одного теста</Typography>
      )}
      <Button variant="contained" onClick={onLogout}>
        Выйти из Аккаунта
      </Button>
    </div>
  );
};
