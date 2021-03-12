import { useSelector } from "react-redux";
import { selectUserIsAuth } from "../store/ducks/user/selectors";
import { setIsAuth, setNotIsAuth } from "../store/ducks/user/slice";
import { useAppDispatch } from "../store/store";

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useSelector(selectUserIsAuth);
  const onSetAuthTrue = () => dispatch(setIsAuth())
  const onLogout = () => {
    window.localStorage.removeItem("token")
    dispatch(setNotIsAuth())
  }
  return {
    isAuth,
    onLogout,
    onSetAuthTrue,
  }
}