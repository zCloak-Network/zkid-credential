// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React, { useCallback, useContext, useMemo, useState } from 'react';

import { mnemonicValidate } from '@zcloak/crypto';

import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  InputPassword,
  NotificationContext,
  OutlinedInput,
  Stack
} from '@credential/react-components';
import { didManager } from '@credential/react-dids/instance';

const RestoreMnemonic: React.FC<{ onSuccess: (didUrl: DidUrl) => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState<string>();
  const { notifyError } = useContext(NotificationContext);
  const [mnemonic, setMnemonic] = useState<string>();

  const isMnemonic = useMemo(() => mnemonic && mnemonicValidate(mnemonic), [mnemonic]);

  const restore = useCallback(() => {
    if (!password) return;
    if (!mnemonic) return;
    if (!isMnemonic) return;

    try {
      const did = didManager.create(mnemonic, password);

      onSuccess(did.id);
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
      <InputPassword
        label="Enter password"
        onChange={setPassword}
        placeholder="Enter your password"
        withBorder
      />
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
