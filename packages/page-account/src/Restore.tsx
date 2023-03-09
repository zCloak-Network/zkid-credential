// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { alpha, Box, Button, Container, Typography } from '@credential/react-components';
import { didManager } from '@credential/react-dids/instance';
import { useQueryParam } from '@credential/react-hooks';

import RestoreKeys from './restore/RestoreKeys';
import RestoreMnemonic from './restore/RestoreMnemonic';
import Success from './Success';

const Restore: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number>();
  const [redirect] = useQueryParam<string>('redirect');
  const [didUrl, setDidUrl] = useState<DidUrl>();

  const onSuccess = useCallback((didUrl: DidUrl) => {
    setDidUrl(didUrl);
    const did = didManager.getDid(didUrl);

    if (did) {
      didManager.setCurrent(did);
    }

    setSuccess(true);
  }, []);

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      {success && didUrl ? (
        <Success
          desc='Remember to keep your secret recovery phrase safe, it’s your responsibility.'
          didUrl={didUrl}
          title='Your account has been restored account!'
          toggleStart={() => navigate(redirect ?? '/claimer')}
        />
      ) : (
        <Box
          sx={({ palette }) => ({
            '> .MuiButton-root': {
              height: 72,
              borderRadius: 2.5,
              background: alpha(palette.primary.main, 0.2)
            }
          })}
        >
          <Typography textAlign='center' variant='h3'>
            Restore account
          </Typography>
          <Typography marginBottom={9} marginTop={3} textAlign='center' variant='inherit'>
            Enter your Mnemonic Phrase or select your DID-Key file here to restore your account.
          </Typography>

          {selected === 1 ? (
            <RestoreMnemonic onSuccess={onSuccess} />
          ) : selected === 0 ? (
            <RestoreKeys onSuccess={onSuccess} />
          ) : (
            <>
              <Button fullWidth onClick={() => setSelected(0)} size='large' variant='outlined'>
                DID-Key file
              </Button>
              <Button fullWidth onClick={() => setSelected(1)} size='large' sx={{ marginTop: 4.5 }} variant='outlined'>
                Mnemonic phrase
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default React.memo(Restore);
