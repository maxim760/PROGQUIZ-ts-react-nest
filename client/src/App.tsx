import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { routes } from "./utils/routes";
import { Container } from "@material-ui/core";
import { MainTemplate } from "./components/MainTemplate";
//TODO: регистрация авторизация польователя через пасспорт попробоавать будет прикольно еще черезн номер телефона
export const App = () => {
  return (
    <MainTemplate>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}
        <Redirect to="/" />
      </Switch>
    </MainTemplate>
  );
};
