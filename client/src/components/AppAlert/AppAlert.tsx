import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

interface AppAlertProps {
  text: string;
  type: "success" | "error"
  msToClose?: number;
  isCanClose?: boolean
}

export const AppAlert: React.FC<AppAlertProps> = ({
  text,
  msToClose,
  isCanClose = false,
  type
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true)
  const onClose = () => setIsOpen(false)
  return (
    <Snackbar
      open={isOpen}
      onClose={isCanClose ? onClose : undefined}
      autoHideDuration={msToClose || null}
    >
      <Alert severity={type}>{text}</Alert>
    </Snackbar>
  );
};
