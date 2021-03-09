import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routes, authRoutes } from "../../utils/routes";

interface AppRouterProps {}

export const AppRouter: React.FC<AppRouterProps> = ({ }): React.ReactElement => {
  const { isAuth } = useAuth()
  const appRoutes = isAuth ? authRoutes : routes

  return (
    <Switch>
      {appRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
      <Redirect to="/" />
    </Switch>
  );
};
