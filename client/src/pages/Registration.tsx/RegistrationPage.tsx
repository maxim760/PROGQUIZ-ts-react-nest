import React, { useState } from "react";
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
import { Alert, AlertTitle } from "@material-ui/lab";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../Profile/ProfilePage.scss";
import "../login.scss";
import { REGEX } from "../../utils/regex";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../utils/routes";
import { useAppDispatch } from "../../store/store";
import { fetchRegisterUser } from "../../store/ducks/user/slice";
import { useSelector } from "react-redux";
import { selectAuthError, selectAuthStatus } from "../../store/ducks/user/selectors";
import { IUserForRegister } from "../../store/ducks/user/types";
import { SuccessAlert } from "../../components/SuccessAlert/SuccessAlert";
type Inputs = {
  email: string;
  username: string;
  password: string;
  password2: string;
};
export const RegistrationPage: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const onToggleShowPassword = () => setIsShowPassword((prev) => !prev);
  const onToggleShowPassword2 = () => setIsShowPassword2((prev) => !prev);

  const { isLoading, isError, isNever, isSuccess } = useSelector(
    selectAuthStatus
  );
  const onMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();
  // realtime валидация
  const { register, handleSubmit, getValues, errors, watch, trigger } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const onComparePasswords = () => {
    watch("password2").length && trigger("password2")
  }
  const error = useSelector(selectAuthError)

  const onSubmitForm = (data: IUserForRegister) => {
    dispatch(fetchRegisterUser(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="login">
      <Typography className="login__title">Регистрация</Typography>
      <Card className="login__card login__card-register">
        <Typography className="login__info">
          Для того чтобы видеть статистику прохождения тестов Вам необходимо
          создать свою учетную запись.
        </Typography>
        <div className="login__group">
          <TextField
            className="profile__input"
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
            className="profile__input"
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
          <FormControl className="profile__input" fullWidth>
            <InputLabel htmlFor="password" style={errors.password ? {color: "red"} : {}}>Пароль</InputLabel>
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
              type={isShowPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onToggleShowPassword}
                    onMouseDown={onMouseDownPassword}
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password ? (
              <FormHelperText style={{color: "red"} }>{errors.password.message}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className="profile__input" fullWidth>
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
              //TODO: создать хук usePassword , чтобы без дублирования
              type={isShowPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onToggleShowPassword2}
                    onMouseDown={onMouseDownPassword}
                  >
                    {isShowPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
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
            <Link to={ROUTE_NAMES.LOGIN}>
              <b>Войдите</b>
            </Link>
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
          <Alert severity="error" style={{ width: "100%" }}>
            <AlertTitle>ошбика</AlertTitle>
            описаник
            {JSON.stringify(error,null,4)}
          </Alert>
        ) : null}
        {isSuccess ? (
          <SuccessAlert text="Проверьте почту, вам должно прийти сообщение, чтобы вы подтвердили почту. Также проверьте папку 'Спам'" />
        ) : null}
      </Card>
    </form>
  );
};
