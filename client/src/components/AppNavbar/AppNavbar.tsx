import React from "react";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

import "./AppNavbar.scss"
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/ducks/user/selectors";

interface AppNavbarProps {}

export const AppNavbar: React.FC<AppNavbarProps> = ({ }): React.ReactElement => {
  const { isAuth } = useAuth()
  const user = useSelector(selectUser)
  const history = useHistory();
  const goToMain = () => history.push("/");
  return (
    <nav
      className="navbar__nav"
    >
      <Button color="primary" variant="contained" onClick={goToMain}>
        <h2>ProgQuiz</h2>
      </Button>
      <Link to={isAuth ? "/profile" : "/login"} className="navbar__link" >
        <Typography variant="h5">{isAuth ? user?.username : "Войти"}</Typography>
        <AccountIcon className="navbar__icon" />
      </Link>
    </nav>
  );
};
