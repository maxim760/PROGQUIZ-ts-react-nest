import React from "react";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

import "./AppNavbar.scss"

interface AppNavbarProps {}

export const AppNavbar: React.FC<AppNavbarProps> = ({}): React.ReactElement => {
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
      <Link to={"/profile"} className="navbar__link" >
        <Typography variant="h5">Аккаунт</Typography>
        <AccountIcon style={{ fontSize: 54 }} />
      </Link>
    </nav>
  );
};
