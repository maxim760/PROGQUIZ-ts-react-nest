import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";

export const usePassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onClick = () => setIsShowPassword(prev => !prev)
  const onMouseDown = (e: React.MouseEvent) => e.preventDefault()
  return {
    input: {
      type: isShowPassword ? "text" : "password"
    },
    button: {
      onClick,
      onMouseDown
    },
    Icon: isShowPassword ? Visibility : VisibilityOff
  }
}