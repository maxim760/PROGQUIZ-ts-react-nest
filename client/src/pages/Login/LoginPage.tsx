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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../Profile/ProfilePage.scss";
import "../login.scss";
import { REGEX } from "../../utils/regex";
import { ROUTE_NAMES } from "../../utils/routes";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { fetchLoginUser } from "../../store/ducks/user/slice";
import { useSelector } from "react-redux";
import { selectAuthError, selectAuthStatus } from "../../store/ducks/user/selectors";
import { IUserForLogin } from "../../store/ducks/user/types";
import { Alert, AlertTitle } from "@material-ui/lab";
type Inputs = {
  email: string;
  password: string;
};
export const LoginPage: React.FC = (): React.ReactElement => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [isShowPassword, setIsShowPassword] = useState(false);
  const onToggleShowPassword = () => setIsShowPassword((prev) => !prev);
  const onMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const { isLoading, isError, isNever, isSuccess } = useSelector(
    selectAuthStatus
  );
  useEffect(() => {
    if (isSuccess) {
      history.push("/")
    }
  }, [isSuccess]);
  const error = useSelector(selectAuthError)
  const onSubmitForm = (data: IUserForLogin) => dispatch(fetchLoginUser(data));
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="login">
      <Typography className="login__title">Авторизация</Typography>
      <Card className="login__card">
        <TextField
          className="profile__input"
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
        <FormControl className="profile__input" fullWidth>
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
          <Alert severity="error" style={{ width: "100%" }}>
            <AlertTitle>ошбика</AlertTitle>
            описаник
            {JSON.stringify(error,null,4)}
          </Alert>
        ) : null}
      </Card>
    </form>
  );
};
