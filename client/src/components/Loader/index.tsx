import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

export const Loader: React.FC = ({}): React.ReactElement => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column"
      }}
    >
      <CircularProgress size={55} />
      <Typography variant="h4">Подождите..</Typography>
    </div>
  );
};
