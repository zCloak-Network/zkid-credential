// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import React, { useContext, useEffect, useState } from 'react';

import { isVC } from '@zcloak/vc/utils';
import { vcVerify } from '@zcloak/verify';

import { addVC } from '@credential/app-store';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

import FileUpload from './FileUpload';
import { NotificationContext } from './Notification';
import { Button, Dialog, DialogContent, DialogHeader, Stack, Typography } from '.';

const ImportCredentialModal: React.FC<{ open: boolean; onClose?: () => void }> = ({
  onClose,
  open
}) => {
  const { did } = useContext(DidsContext);
  const [value, setValue] = useState<File[]>([]);
  const [result, setResult] = useState<
    { error: null; vc: VerifiableCredential } | { error: Error; vc: null }
  >();
  const { notifyError } = useContext(NotificationContext);

  useEffect(() => {
    if (value.length > 0) {
      value[0]
        .text()
        .then((text) => {
          return JSON.parse(text);
        })
        .then((json) => {
          if (!isVC(json)) throw new Error('not a valid credential file');

          return json;
        })
        .then(async (vc) => {
          const verifiedVC = await vcVerify(vc, resolver);
          const verifiedOwn = vc.holder === did.id;

          if (verifiedVC && verifiedOwn) {
            setResult({ error: null, vc });
          } else if (!verifiedVC) {
            throw new Error('Verify data error. Import denied.');
          } else {
            throw new Error('This credential is not yours. Import denied.');
          }
        })
        .catch((error) => {
          setResult({ error, vc: null });
        });
    }
  }, [did, value]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      {!result && <DialogHeader onClose={onClose}>Import credential type</DialogHeader>}
      <DialogContent sx={{ width: 500, maxWidth: '100%' }}>
        {result ? (
          <Stack alignItems="center" spacing={2}>
            {result.error ? (
              <>
                <ErrorIcon color="warning" sx={{ width: 50, height: 50 }} />
                <Typography variant="h5">Import denied</Typography>
                <Typography color="grey.700" variant="inherit">
                  {result.error.message}
                </Typography>
                <Button
                  onClick={() => {
                    setValue([]);
                    setResult(undefined);
                  }}
                  size="large"
                  variant="contained"
                >
                  Reimport
                </Button>
              </>
            ) : (
              <>
                <CheckCircleIcon color="primary" sx={{ width: 50, height: 50 }} />
                <Typography variant="h5">Import successful</Typography>
                <Button
                  onClick={() => {
                    if (result.vc) {
                      addVC(result.vc)
                        .then(() => onClose?.())
                        .catch(notifyError);
                    }
                  }}
                  size="large"
                  variant="contained"
                >
                  Confirm
                </Button>
              </>
            )}
          </Stack>
        ) : (
          <FileUpload onChange={setValue} value={value} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ImportCredentialModal);
