// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { InputPassword, NotificationContext } from '@credential/react-components';
import { didManager } from '@credential/react-dids/instance';

const Restore: React.FC<{ onSuccess: (didUrl: DidUrl) => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState<string>();
  const [file, setFile] = useState<File>();
  const { notifyError } = useContext(NotificationContext);

  const restore = useCallback(() => {
    if (!password) return;
    if (!file) return;

    file
      .text()
      .then((text) => {
        const did = didManager.restore(JSON.parse(text), password);

        return did.id;
      })
      .then(onSuccess)
      .catch((error) => {
        notifyError(error as Error);
      });
  }, [file, notifyError, onSuccess, password]);

  return (
    <Stack spacing={5.5}>
      <FormControl fullWidth variant="outlined">
        <InputLabel shrink>DID-Key File</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <Button component="label" variant="contained">
                Select DID-Key file
                <input
                  accept="application/json"
                  hidden
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                  type="file"
                />
              </Button>
            </InputAdornment>
          }
          fullWidth
          placeholder="Select DID-Key file"
          value={file?.name}
        />
      </FormControl>
      <Divider sx={() => ({ marginTop: 3, marginBottom: 3 })} variant="fullWidth" />
      <FormControl fullWidth variant="outlined">
        <InputLabel shrink>Enter Keyfile password</InputLabel>
        <InputPassword
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>
      <Button fullWidth onClick={restore} size="large" variant="contained">
        Restore
      </Button>
    </Stack>
  );
};

export default React.memo(Restore);
