import React from "react";
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
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utils/routes";
import { useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
} from "../../../store/ducks/user/selectors";
import { AppAlert } from "../../../components";
import { usePassword } from "../../../hooks/usePassword";
import { useRegistrationForm } from "../hooks/useRegistrationForm";

export const RegistrationPage: React.FC = (): React.ReactElement => {
  const pass = usePassword();
  const repeatPass = usePassword();
  const authError = useSelector(selectAuthError)
  const { isLoading, isError, isSuccess } = useSelector(
    selectAuthStatus
  );
  const {onComparePasswords, onSubmitForm, errors, register, watch, toLogin} = useRegistrationForm()

  return (
    <form onSubmit={onSubmitForm} className="login">
      <Typography className="login__title">Регистрация</Typography>
      <Card className="login__card login__card-register">
        <Typography className="login__info">
          Для того чтобы видеть статистику прохождения тестов Вам необходимо
          создать свою учетную запись.
        </Typography>
        <div className="login__group">
          <TextField
            className="login__input"
            autoFocus
            name="email"
            label="Почта"
            type="email"
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
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            className="login__input"
            name="username"
            label="Имя"
            type="username"
            fullWidth
            inputRef={register({
              required: {
                value: true,
                message: "Поле обязательно",
              },
              minLength: {
                value: 4,
                message: "Минимальная длина - 4 символа",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>
        <div className="login__group">
          <FormControl className="login__input" fullWidth>
            <InputLabel
              htmlFor="password"
              style={errors.password ? { color: "red" } : {}}
            >
              Пароль
            </InputLabel>
            <Input
              onChange={onComparePasswords}
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
                  value: REGEX.password,
                  message:
                    "Пароль должен включать буквы обоих регистров и хотя бы 1 цифру",
                },
              })}
              error={!!errors.password}
              fullWidth
              name="password"
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
              {...pass.input}
            />
            {errors.password ? (
              <FormHelperText style={{ color: "red" }}>
                {errors.password.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className="login__input" fullWidth>
            <InputLabel
              htmlFor="password"
              style={!!errors.password2 ? { color: "red" } : {}}
            >
              Повторите пароль
            </InputLabel>
            <Input
              inputRef={register({
                required: {
                  value: true,
                  message: "Поле обязательно",
                },
                validate: (value) =>
                  value === watch("password") || "Пароли не совпадают",
              })}
              error={!!errors.password2}
              fullWidth
              name="password2"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    {...repeatPass.button}
                  >
                    <repeatPass.Icon />
                  </IconButton>
                </InputAdornment>
              }
              {...repeatPass.input}
            />
            {errors.password2 ? (
              <FormHelperText style={{ color: "red" }}>
                {errors.password2.message}
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>

        <div className="login__footer">
          <Typography>
            Есть аккаунт?&nbsp;
            <p className="login__link" onClick={toLogin} role="button">
              <b>Войдите</b>
            </p>
          </Typography>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Создать&nbsp;{isLoading ? <CircularProgress /> : null}
          </Button>
        </div>
        {isError ? (
          <AppAlert text={authError?.error!} isCanClose type="error"  />
        ) : null}
        {isSuccess ? (
          <AppAlert
            text="Проверьте почту, вам должно прийти сообщение, чтобы вы подтвердили почту. Также проверьте папку 'Спам'"
            type="success"
            isCanClose
          />
        ) : null}
      </Card>
    </form>
  );
};
