import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import "./loader.scss"

interface LoaderProps {
  size?: number
}

export const Loader: React.FC<LoaderProps> = ({size = 55} ): React.ReactElement => {
  return (
    <div
      className="loader"
    >
      <CircularProgress size={size} />
      <Typography variant="h4">Подождите..</Typography>
    </div>
  );
};
