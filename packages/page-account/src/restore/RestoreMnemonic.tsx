// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Divider, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { validateMnemonic } from '@zcloak/crypto';

import { InputPassword, NotificationContext } from '@credential/react-components';
import { didManager, keyring } from '@credential/react-dids/instance';

const RestoreMnemonic: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState<string>();
  const { notifyError } = useContext(NotificationContext);
  const [mnemonic, setMnemonic] = useState<string>();

  const isMnemonic = useMemo(() => mnemonic && validateMnemonic(mnemonic), [mnemonic]);

  const restore = useCallback(() => {
    if (!password) return;
    if (!mnemonic) return;
    if (!isMnemonic) return;

    try {
      keyring.unlock(password);
      didManager.create(mnemonic);
      onSuccess();
    } catch (error) {
      notifyError(error);
    }
  }, [isMnemonic, mnemonic, notifyError, onSuccess, password]);

  return (
    <Stack spacing={5.5}>
      <FormControl error={!!mnemonic && !isMnemonic} fullWidth variant="outlined">
        <InputLabel shrink>Mnemonic Phrase</InputLabel>
        <OutlinedInput
          fullWidth
          notched
          onChange={(e) => setMnemonic(e.target.value)}
          placeholder="Enter 12 word Mnemonic Phrase"
          value={mnemonic}
        />
      </FormControl>
      <Divider sx={() => ({ marginTop: 3, marginBottom: 3 })} variant="fullWidth" />
      <FormControl fullWidth variant="outlined">
        <InputLabel shrink>Enter password</InputLabel>
        <InputPassword
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>
      <Button
        disabled={!isMnemonic || !mnemonic || !password}
        fullWidth
        onClick={restore}
        size="large"
        variant="contained"
      >
        Restore
      </Button>
    </Stack>
  );
};

export default React.memo(RestoreMnemonic);
