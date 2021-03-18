import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./ModalShare.scss"
import {
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  VKShareButton,
  TelegramIcon,
  VKIcon,
  OKIcon,
  OKShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useSelector } from "react-redux";
import {
  selectResultUrl,
  selectUrlStatus,
} from "../../../../store/ducks/quiz/selectors";
import { AppAlert, Loader } from "../../../../components";

interface ModalShareProps {
  isVisible: boolean;
  onClose(): void;
}

const social = [
  {
    Component: VKShareButton,
    Icon: VKIcon,
  },
  {
    Component: TelegramShareButton,
    Icon: TelegramIcon,
  },
  {
    Component: WhatsappShareButton,
    Icon: WhatsappIcon,
  },
  {
    Component: OKShareButton,
    Icon: OKIcon,
  },
  {
    Component: TwitterShareButton,
    Icon: TwitterIcon,
  },
];

export const ModalShare: React.FC<ModalShareProps> = ({
  isVisible,
  onClose,
}): React.ReactElement | null => {
  const url = useSelector(selectResultUrl)!;
  const title = "Мой результат";

  const { isError, isLoading } = useSelector(selectUrlStatus);

  if(!isVisible) {
    return null
  }
  if (isError) {
    return <AppAlert text="Не удалось загрузить результат" type="error" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle >
        Поделитесь результатом в соц. сетях
      </DialogTitle>
      <DialogContent className="share__content">
        {social.map(({Component, Icon}, i) => (
          <Component url={url} title={title} className="share__btn" key={i} >
            <Icon size={32} round />
          </Component>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
