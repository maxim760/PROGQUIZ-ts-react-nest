import React from "react";
import { Container, Divider } from "@material-ui/core";
import { AppNavbar } from "../AppNavbar/AppNavbar";
export type MainTemplateProps = {
  children: any;
};

export const MainTemplate: React.FC<MainTemplateProps> = ({
  children,
}): React.ReactElement => {
  return (
    <Container style={{height:"100vh"}}>
      <AppNavbar />
      <Divider style={{width:"100%"}} />
      <main style={{height: "calc(100% - 61px)"}}>{children}</main>
    </Container>
  );
};
