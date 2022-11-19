// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import LockIcon from '@mui/icons-material/Lock';
import { Button, Dialog, DialogContent, InputAdornment, lighten, Stack } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { DialogHeader, InputPassword } from '@credential/react-components';

import { DidsContext } from './DidsProvider';
import { didManager } from './instance';

const DidsModal: React.FC<
  React.PropsWithChildren<{
    title: React.ReactNode;
    open: boolean;
    steps?: React.ReactNode;
    onClose?: () => void;
    onUnlock?: () => void;
  }>
> = ({ children, onClose, onUnlock, open, steps, title }) => {
  const { did } = useContext(DidsContext);
  const [password, setPassword] = useState<string>();
  const [isLocked, setIsLocked] = useState<boolean>(true);

  useEffect(() => {
    did && setIsLocked(didManager.isLocked(did?.id));
  }, [did]);

  const unlock = useCallback(() => {
    if (!password || !did) return;

    didManager.unlock(did.id, password);

    onUnlock?.();
    setPassword(undefined);
    setIsLocked(false);
  }, [did, onUnlock, password]);

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogHeader onClose={onClose}>{title}</DialogHeader>
      <DialogContent>
        <Stack spacing={3}>
          {isLocked && (
            <>
              <InputPassword
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please input password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                }
                sx={({ palette }) => ({
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent'
                  },
                  border: 'none',
                  background: lighten(palette.primary.main, 0.94)
                })}
              />
              <Button fullWidth onClick={unlock} variant="contained">
                Unlock
              </Button>
            </>
          )}
          {isLocked ? null : steps || children}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DidsModal);
