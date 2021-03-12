import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import "../../Profile/ProfilePage.scss";
import "../login.scss";
import { REGEX } from "../../../utils/regex";
import { ROUTE_NAMES } from "../../../utils/routes";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthError, selectAuthStatus } from "../../../store/ducks/user/selectors";
import { usePassword } from "../../../hooks/usePassword";
import { AppAlert } from "../../../components";
import { useLoginForm } from "../../Profile/hooks/useLoginForm";

export const LoginPage: React.FC = (): React.ReactElement => {
  const history = useHistory()
  const pass = usePassword();
  
  const { isLoading, isError, isNever, isSuccess } = useSelector(
    selectAuthStatus
  );
  useEffect(() => {
    if (isSuccess) {
      history.push("/")
    }
  }, [isSuccess]);
  const authError = useSelector(selectAuthError)
  const { errors, onSubmitForm, register } = useLoginForm()
  return (
    <form onSubmit={onSubmitForm} className="login">
      <Typography className="login__title">Авторизация</Typography>
      <Card className="login__card">
        <TextField
          className="login__input"
          autoFocus
          margin="dense"
          name="email"
          label="Почта"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          inputRef={register({
            required: {
              value: true,
              message: "Поле обязательно",
            },
            pattern: {
              value: REGEX.email,
              message: "Некорректная почта",
            },
          })}
          fullWidth
        />
        <FormControl className="login__input" fullWidth>
          <InputLabel
            htmlFor="password"
            style={!!errors.password ? { color: "red" } : {}}
          >
            Пароль
          </InputLabel>
          <Input
            error={!!errors.password}
            inputRef={register({
              required: {
                value: true,
                message: "Поле обязательно",
              },
              minLength: {
                value: 6,
                message: "Минимальная длина пароля - 6 символа",
              },
              pattern: {
                value: /^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/,
                message:
                  "Пароль должен включать буквы обоих регистров и хотя бы 1 цифру",
              },
            })}
            fullWidth
            name="password"
            {...pass.input}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  {...pass.button}
                >
                  <pass.Icon />
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password ? (
            <FormHelperText style={{ color: "red" }}>
              {errors.password.message}
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="login__footer">
          <Typography>
            Нет аккаунта?&nbsp;
            <Link to={ROUTE_NAMES.REGISTRATION}>
              <b>Зарегистрируйтесь</b>
            </Link>
          </Typography>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Войти&nbsp;{isLoading ? <CircularProgress /> : null}
          </Button>
        </div>
        {isError ? (
          <AppAlert text={authError?.error!} isCanClose type="error"  />
        ) : null}
      </Card>
    </form>
  );
};
