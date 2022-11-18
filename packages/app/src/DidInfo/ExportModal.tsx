// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IDidDetails } from '@zcloak/did/types';

import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel
} from '@mui/material';
import FileSaver from 'file-saver';
import React, { useCallback, useState } from 'react';

import { DialogHeader, InputPassword } from '@credential/react-components';
import { didManager } from '@credential/react-dids/instance';

interface Props {
  did: IDidDetails;
  onClose: () => void;
}

const ExportModal: React.FC<Props> = ({ did, onClose }) => {
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<Error>();

  const handleExport = useCallback(() => {
    if (!password) return;

    try {
      const json = didManager.backup(did.id, password);

      if (!json) return;
      const blobSiningJson = new Blob([JSON.stringify(json)], {
        type: 'text/plain;charset=utf-8'
      });

      FileSaver.saveAs(blobSiningJson, `${json.didUrl}.json`);
      onClose();
    } catch (error) {
      setError(error as Error);
    }
  }, [did.id, onClose, password]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open>
      <DialogHeader onClose={onClose}>Export did</DialogHeader>
      <DialogContent>
        <FormControl error={!!error} fullWidth variant="outlined">
          <InputLabel shrink>Please input password</InputLabel>
          <InputPassword onChange={(e) => setPassword(e.target.value)} />
          {error && <FormHelperText>Password error</FormHelperText>}
        </FormControl>
        <Button
          disabled={!password}
          fullWidth
          onClick={handleExport}
          sx={{ marginTop: 2 }}
          variant="contained"
        >
          Export did
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ExportModal);
