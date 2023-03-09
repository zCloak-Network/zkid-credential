// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { DialogTitle, IconButton } from '@mui/material';
import React from 'react';

const DialogHeader: React.FC<React.PropsWithChildren<{ onClose?: () => void }>> = ({ children, onClose }) => {
  return (
    <DialogTitle>
      {children}
      {onClose && (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 16,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseOutlined />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default React.memo<typeof DialogHeader>(DialogHeader);
