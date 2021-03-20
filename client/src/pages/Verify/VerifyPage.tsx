import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loader, AppAlert } from "../../components";
import { UsersApi } from "../../service/UsersApi";
import { IAuthError } from "../../store/ducks/user/types";
import { ILoadingStatus } from "../../store/types";
import { ROUTE_NAMES } from "../../utils/routes";
import "./verify.scss";

export const VerifyPage: React.FC = (): React.ReactElement | null => {
  const params: { hash: string } = useParams();
  const history = useHistory();
  const [loadingStatus, setLoadingStatus] = useState(ILoadingStatus.NEVER);
  const [error, setError] = useState<IAuthError>(null);
  const { hash } = params;
  useEffect(() => {
    setLoadingStatus(ILoadingStatus.LOADING);
    const verifyUser = async () => {
      try {
        await UsersApi.verify(hash);
        setLoadingStatus(ILoadingStatus.SUCCESS);
      } catch (error) {
        setError(error.message);
        setLoadingStatus(ILoadingStatus.ERROR);
      }
    };
    verifyUser();
  }, []);
  useEffect(() => {
    if (loadingStatus === ILoadingStatus.SUCCESS) {
      setTimeout(() => {
        history.push(ROUTE_NAMES.LOGIN);
      }, 2500);
    }
  }, [loadingStatus]);
  if (loadingStatus === ILoadingStatus.ERROR) {
    return (
      <div className="verify">
        <Typography>Ошибка: {error}</Typography>
      </div>
    );
  }
  if (loadingStatus === ILoadingStatus.LOADING) {
    return <Loader />;
  }
  if (loadingStatus === ILoadingStatus.SUCCESS) {
    return (
      <div className={"verify"}>
        <AppAlert
          msToClose={5000}
          text={"Аккаунт успешно подтверждён"}
          type="success"
        />
        <Typography className={"verify__info"}>
          Сейчас вы будете перенаправлены на страницу авторизации!
        </Typography>
        <CircularProgress />
      </div>
    );
  } else return null;
};
