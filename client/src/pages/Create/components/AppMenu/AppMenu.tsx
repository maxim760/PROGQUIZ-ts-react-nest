import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMenu } from '../../hooks/useMenu';
import { useRemove } from '../../hooks/useRemove';

interface MenuProps {
  onEdit(): void,
  onBack(): void,
  id: string,
  className?: string,
}

export const AppMenu: React.FC<MenuProps> = ({ onEdit, id, className, onBack }): React.ReactElement => {
  
  const { btn, menu } = useMenu()
  const { onRemove: removeQuestion } = useRemove(id)
  const onRemove = () => {
    if (window.confirm("Вы уверены?")) {
      onBack()
      removeQuestion()
      menu.onClose()
    }
  }
  const onEditQuest = () => {
    onEdit()
    menu.onClose()
  }

  return (
    <div className={className}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        {...btn}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        keepMounted
        {...menu}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
          <MenuItem onClick={onEdit}>
            Редактировать
          </MenuItem>
          <MenuItem onClick={onRemove}>
            Удалить
          </MenuItem>
      </Menu>
    </div>
  );
}