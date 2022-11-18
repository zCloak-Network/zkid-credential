// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Task } from '@credential/react-hooks/types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconDetails } from '@credential/app-config/icons';

import Approve from './RequestDetails/Approve';
import Reject from './RequestDetails/Reject';

const ActionButton: React.FC<{
  task: Task;
}> = ({ task }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        MenuListProps={{ sx: { padding: 1 } }}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleClose}
        open={open}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          component={Link}
          sx={({ palette }) => ({ color: palette.grey[600] })}
          to={`/attester/tasks/${task.id}`}
        >
          <ListItemIcon sx={{ minWidth: '0px !important', marginRight: 1 }}>
            <IconDetails />
          </ListItemIcon>
          <ListItemText>Details</ListItemText>
        </MenuItem>
        {task.meta.taskStatus === 'pending' && <Approve task={task} type="menu" />}
        {task.meta.taskStatus === 'pending' && <Reject task={task} type="menu" />}
      </Menu>
    </>
  );
};

export default React.memo(ActionButton);
