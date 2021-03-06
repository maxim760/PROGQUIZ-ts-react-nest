import { Button } from '@material-ui/core';
import React, {useState} from 'react'
import { ModalCreate } from './ModalCreate';

interface NonAuthorizedProps {
  onAuthorize(): void
}

export const NonAuthorized: React.FC<NonAuthorizedProps> = ({ onAuthorize }): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const onClickOpen = () => {
    setIsVisible(true);
  };
  const onClose = () => {
    setIsVisible(false);
  };
  const onCreate = () => {
    onClose();
    onAuthorize();
  };
  
  return (
    <div>
      <h1>У вас нет учетной записи </h1>
      <h2>Создайте ее </h2>
      <Button onClick={onClickOpen} color={"primary"} variant="contained">
        Создать учетную запись
      </Button>
      <ModalCreate
        onCreate={onCreate}
        onClose={onClose}
        isVisible={isVisible}
      />
    </div>
  );
}