import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { IStat } from "../../../service/ResultsApi";
import { TableStat } from "./TableStat";

interface ModalTableProps {
  onClose(): void;
  isVisible: boolean;
  stat: IStat[];
  successPercent: number;
}

export const ModalTable: React.FC<ModalTableProps> = ({
  onClose,
  isVisible,
  stat,
  successPercent,
}): React.ReactElement => {
  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      // style={{width: "900px"}}
    >
      <DialogTitle id="form-dialog-title">Более подробная статистика</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Более подробная статистика</DialogContentText> */}
        <TableStat stat={stat} successPercent={successPercent} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
