import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { routes } from "./utils/routes";
import { MainTemplate } from "./components/MainTemplate";
import { useAppDispatch } from "./store/store";
import { useAuth } from "./hooks/useAuth";
import { setUser } from "./store/ducks/user/slice";
import { UsersApi } from "./service/UsersApi";
import { Loader } from "./components/Loader";
import { Container } from "@material-ui/core";
import { AppRouter } from "./components/AppRouter/AppRouter";
export const App = () => {
  const dispatch = useAppDispatch();
  const { onSetAuthFalse, onSetAuthTrue } = useAuth();
  const [pageLoading, setPageLoading] = React.useState(true);
  React.useLayoutEffect(() => {
    async function checkUser() {
      try {
        const dataUser = await UsersApi.getProfile();
        onSetAuthTrue();
        dispatch(setUser(dataUser));
      } catch (error) {
        onSetAuthFalse();
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
