import React, {useState} from "react";
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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface ModalCreateProps {
  onClose():void
  onCreate(): void
  isVisible: boolean
}

export const ModalCreate: React.FC<ModalCreateProps> = ({ onClose, onCreate, isVisible }): React.ReactElement => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onToggleShowPassword = () => setIsShowPassword(prev => !prev)
  const onMouseDownPassword = (event: React.MouseEvent) => event.preventDefault()
  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Создать</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для того чтобы видеть статистику прохождения тестов Вам необходимо
          создать свою учетную запись.
        </DialogContentText>
        <TextField
          className="profile__input"
          autoFocus
          margin="dense"
          id="email"
          label="Почта"
          type="email"
          fullWidth
        />
        <TextField
          className="profile__input"
          margin="dense"
          id="username"
          label="Имя"
          type="username"
          fullWidth
        />
        <FormControl className="profile__input" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
          <Input
            fullWidth
            id="standard-adornment-password"
            type={isShowPassword ? "text" : "password"}
            // value={values.password}
            // onChange={handleChange("password")}
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
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button onClick={onCreate} color="primary">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};
