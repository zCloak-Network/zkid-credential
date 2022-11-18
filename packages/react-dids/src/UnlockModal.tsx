// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import LockIcon from '@mui/icons-material/Lock';
import { Button, Dialog, DialogContent, InputAdornment, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { DialogHeader, InputPassword } from '@credential/react-components';

import { keyring } from './instance';

function UnlockModal({
  onClose,
  onUnlock,
  open
}: {
  open: boolean;
  onClose?: () => void;
  onUnlock: () => void;
}) {
  const [password, setPassword] = useState<string>();

  const _onUnlock = useCallback(() => {
    try {
      if (!password) return;

      keyring.unlock(password);

      onUnlock();
    } catch (error) {}
  }, [onUnlock, password]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Unlock</DialogHeader>
      <DialogContent>
        <Stack spacing={4}>
          <InputPassword
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please input password"
            startAdornment={
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            }
          />
          <Button fullWidth onClick={_onUnlock} variant="contained">
            Unlock
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(UnlockModal);
