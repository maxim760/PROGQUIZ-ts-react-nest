import React from "react";
import { Container, Divider } from "@material-ui/core";
import { AppNavbar } from "../AppNavbar/AppNavbar";
import { useAuth } from "../../hooks/useAuth";
import "./mainTemplate.scss"
export type MainTemplateProps = {
  children: any;
};

export const MainTemplate: React.FC<MainTemplateProps> = ({
  children,
}): React.ReactElement => {
  return (
    <Container className="main__container">
      <AppNavbar />
      <Divider className="main__divider" />
      <main className="main__content">{children}</main>
    </Container>
  );
};
