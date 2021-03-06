import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./ProfilePage.scss";
import { ModalCreate } from "./components/ModalCreate";
import { NonAuthorized } from "./components/NonAuthorized";

interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}): React.ReactElement => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const onAuthorize = () => setIsAuthorized(true)

  if (!isAuthorized) {
    return (
      <NonAuthorized onAuthorize={onAuthorize} />
    );
  }
  return <div>Страница профиля у вас 3 теста из 5 норм зашли так</div>;
};
