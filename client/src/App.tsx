import React from "react";

import { MainTemplate, Loader, AppRouter } from "./components";
import { useAppDispatch } from "./store/store";
//TODO: при создании теста!!! сделать драг н дроп для вариантов ответа и самих вопросов
//TODO: также 2 возможности отображнеия: 1 вопрос на экране, лист вопросов сразу!!1!!11!!
import { useAuth } from "./hooks/useAuth";
import { setUser } from "./store/ducks/user/slice";
import { UsersApi } from "./service/UsersApi";
import { Container } from "@material-ui/core";
export const App = () => {
  const dispatch = useAppDispatch();
  const { onLogout, onSetAuthTrue } = useAuth();
  const [pageLoading, setPageLoading] = React.useState(true);
  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const dataUser = await UsersApi.getProfile();
        onSetAuthTrue();
        dispatch(setUser(dataUser));
      } catch (error) {
        onLogout();
      }
      setPageLoading(false);
    }
    checkUser();
  }, []);
  if (pageLoading) {
    return (
      <Container style={{ height: "100vh" }}>
        <Loader />
      </Container>
    );
  }
  return (
    <MainTemplate>
      <AppRouter />
    </MainTemplate>
  );
};
