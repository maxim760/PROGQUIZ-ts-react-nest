import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface SuccessAlertProps {
  text: string;
  msToClose?: number;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  text,
  msToClose,
}): React.ReactElement => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={msToClose || null}
    >
      <Alert severity="success">{text}</Alert>
    </Snackbar>
  );
};
