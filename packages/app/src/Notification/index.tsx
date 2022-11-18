// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import { Badge, Box, Drawer, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import Cell from './Cell';
import { UseNotification } from './useNotification';

interface Props {
  unreads: UseNotification;
  open: boolean;
  onClose: () => void;
}

const Notification: React.FC<Props> = ({
  onClose,
  open,
  unreads: { all, allUnread, message, messageUnread, task, taskUnread }
}) => {
  const [type, setType] = useState(0);

  const messages = useMemo(
    () => (type === 0 ? all : type === 1 ? task : message),
    [all, message, task, type]
  );

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      sx={{
        '.MuiPaper-root': {
          width: 532,
          maxWidth: '100%'
        }
      }}
    >
      <Box
        sx={({ palette }) => ({
          position: 'relative',
          background: palette.grey[100],
          paddingX: 2,
          paddingTop: 3
        })}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 500 }}>Notification</Typography>
        <Tabs onChange={(_, value) => setType(value)} value={type}>
          <Tab
            label={
              <Badge badgeContent={allUnread} color="warning" max={99} variant="dot">
                All
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={taskUnread} color="warning" max={99} variant="dot">
                Tasks
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={messageUnread} color="warning" max={99} variant="dot">
                Messages
              </Badge>
            }
          />
        </Tabs>
      </Box>
      {messages?.map((message, index) => (
        // TODO: isRead and onRead
        <Cell
          isRead
          key={index}
          message={message}
          onRead={() => {
            console.log('read');
          }}
        />
      ))}
    </Drawer>
  );
};

export default React.memo(Notification);
