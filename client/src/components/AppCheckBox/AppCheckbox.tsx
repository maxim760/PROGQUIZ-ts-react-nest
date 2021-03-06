import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

interface AppCheckBoxProps {
  checked: boolean;
  onChange(): void;
  text?: string | [string, string];
  className: string
}

export const AppCheckBox: React.FC<AppCheckBoxProps> = ({
  checked,
  onChange,
  text,
  className
}): React.ReactElement => {
  const labelProp = text
    ? typeof text === "string"
      ? text
      : !checked
        ? text[0]
        : text[1]
    : undefined;

  return (
    <FormControlLabel
      className={className}
      control={
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      }
      label={labelProp}
    />
  );
};
