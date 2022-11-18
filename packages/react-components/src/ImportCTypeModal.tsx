// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { CTypeContext, DialogHeader } from '@credential/react-components';

const ImportCTypeModal: React.FC<{ open: boolean; onClose?: () => void }> = ({ onClose, open }) => {
  const { importCType } = useContext(CTypeContext);
  const [hash, setHash] = useState<string>();

  const handleClick = useCallback(() => {
    if (hash) {
      importCType(hash as HexString);
      onClose?.();
    }
  }, [hash, importCType, onClose]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Import credential type</DialogHeader>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel shrink>CType hash</InputLabel>
          <OutlinedInput
            onChange={(e) => setHash(e.target.value)}
            placeholder="please input credential type hash"
          />
        </FormControl>
        <Button
          fullWidth
          onClick={handleClick}
          size="large"
          sx={{ marginTop: 4 }}
          variant="contained"
        >
          Import
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ImportCTypeModal);
