import React, { useState } from "react";
import {
  Button,
} from "@material-ui/core";
import "./ProfilePage.scss";
interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}): React.ReactElement => {
  // const [isAuthorized, setIsAuthorized] = useState(false);

  // const onAuthorize = () => setIsAuthorized(true)

  // if (!isAuthorized) {
  //   return (
  //     <NonAuthorized onAuthorize={onAuthorize} />
  //   );
  // }
  return <div>
    <Button variant="contained">Выйти</Button>
  </div>;
};
