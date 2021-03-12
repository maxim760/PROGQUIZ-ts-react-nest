import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";

interface AppAlertProps {
  text: string | string[];
  type: "success" | "error";
  msToClose?: number;
  isCanClose?: boolean;
}

export const AppAlert: React.FC<AppAlertProps> = ({
  text,
  msToClose,
  isCanClose = false,
  type,
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  useEffect(() => {
    if (msToClose) {
      setTimeout(() => {
        onClose();
      }, msToClose);
    }
    return () => {
      onClose();
    };
  }, []);
  return (
    <>
      {isOpen ? (
        <Alert severity={type} onClose={isCanClose ? onClose : undefined}>
          {typeof text === "string" ? (
            text
          ) : (
            <>
              <Typography>Следующие ошибки</Typography>
              <span style={{ whiteSpace: "pre-wrap" }}>{text.join("\n")}</span>
            </>
          )}
        </Alert>
      ) : null}
    </>
  );
};
