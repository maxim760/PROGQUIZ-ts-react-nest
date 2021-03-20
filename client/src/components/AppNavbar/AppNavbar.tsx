import React from "react";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import "./AppNavbar.scss";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/ducks/user/selectors";
import { ROUTE_NAMES } from "../../utils/routes";

export const AppNavbar: React.FC = (): React.ReactElement => {
  const { isAuth } = useAuth();
  const user = useSelector(selectUser);
  const history = useHistory();
  const goToMain = () => history.push(ROUTE_NAMES.MAIN);
  return (
    <nav className="navbar__nav">
      <Button color="primary" variant="contained" onClick={goToMain}>
        <h2>ProgQuiz</h2>
      </Button>
      <div className="navbar__links">
        {isAuth ? (
          <Link to={ROUTE_NAMES.CREATE_MAIN} className="navbar__link">
            <Typography variant="h6" color="primary">
              Создать тест
            </Typography>
            <PlusIcon className="navbar__icon navbar__icon--small" color="primary" />
          </Link>
        ) : null}

        <Link to={isAuth ? ROUTE_NAMES.PROFILE : ROUTE_NAMES.LOGIN} className="navbar__link">
          <Typography variant="h5">
            {isAuth ? user?.username : "Войти"}
          </Typography>
          <AccountIcon className="navbar__icon" />
        </Link>
      </div>
    </nav>
  );
};
