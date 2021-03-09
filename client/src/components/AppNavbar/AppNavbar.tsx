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
  const { isAuth, onSetAuthFalse, onSetAuthTrue } = useAuth()
  const user = useSelector(selectUser)
  const history = useHistory();
  const goToMain = () => history.push("/");
  return (
    <nav
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button color="primary" variant="contained" onClick={goToMain}>
        <h2>ProgQuiz</h2>
      </Button>
      <button onClick={onSetAuthTrue}>
        set auth trye
      </button>
      <button onClick={onSetAuthFalse}>
        set auth false
      </button>
      <Link to={isAuth ? "/profile" : "/login"} className="navbar__link" >
        <Typography variant="h5">{isAuth ? user?.username : "Войти"}</Typography>
        <AccountIcon style={{ fontSize: 54 }} />
      </Link>
    </nav>
  );
};
