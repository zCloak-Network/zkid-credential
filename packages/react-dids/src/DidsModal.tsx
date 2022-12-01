// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';

import { Dialog, DialogContent, DialogHeader, Stack } from '@credential/react-components';

import { DidsContext } from './DidsProvider';

const DidsModal: React.FC<
  React.PropsWithChildren<{
    title: React.ReactNode;
    open: boolean;
    steps?: React.ReactNode;
    onClose?: () => void;
  }>
> = ({ children, onClose, open, steps, title }) => {
  const { isLocked } = useContext(DidsContext);

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogHeader onClose={onClose}>{title}</DialogHeader>
      <DialogContent>
        <Stack spacing={3}>{isLocked ? null : steps || children}</Stack>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DidsModal);
