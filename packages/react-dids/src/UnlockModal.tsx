// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Dialog, DialogContent, Stack } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { DialogHeader, InputPassword } from '@credential/react-components';

import DidName from './DidName';
import { DidsContext } from './DidsProvider';
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
  const { did } = useContext(DidsContext);
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<Error | null>(null);

  const _onUnlock = useCallback(() => {
    try {
      if (!password || !did) return;

      Array.from(did.keyRelationship.values()).forEach(({ publicKey }) =>
        keyring.getPair(publicKey).unlock(password)
      );

      onUnlock();
    } catch (error) {
      setError(error as Error);
    }
  }, [did, onUnlock, password]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Unlock</DialogHeader>
      <DialogContent>
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            _onUnlock();
          }}
          spacing={4}
        >
          <InputPassword
            autoFocus
            error={error}
            label={
              <>
                Input&nbsp; (<DidName value={did?.id} />) &nbsp;password
              </>
            }
            onChange={setPassword}
            placeholder="Please input password"
          />
          <Button fullWidth type="submit" variant="contained">
            Unlock
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(UnlockModal);
