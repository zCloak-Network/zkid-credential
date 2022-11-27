// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useMemo, useState } from 'react';

import { useCredentials } from '@credential/app-store';
import { usePendingCredentials } from '@credential/app-store/pending-credential';

import CredentialCell, { CredentialProps } from './CredentialCell';
import ImportCredential from './ImportCredential';

const Claims: React.FC = () => {
  const [type, setType] = useState(0);
  const credentials = useCredentials();
  const pendingCredentials = usePendingCredentials(['pending', 'rejected']);

  const list = useMemo((): CredentialProps[] => {
    const _credentials = credentials ?? [];
    const _pendingCredentials = pendingCredentials ?? [];

    return type === 0
      ? (
          _credentials.map((credential) => ({
            credential: credential.vc,
            rootHash: credential.rootHash,
            time: credential.issuanceDate,
            issuer: credential.issuer,
            status: 'approved'
          })) as CredentialProps[]
        ).concat(
          _pendingCredentials.map((credential) => ({
            credential: credential.rawCredential,
            rootHash: credential.rootHash,
            time: credential.submitDate,
            issuer: credential.issuer,
            status: credential.status
          }))
        )
      : _credentials.map((credential) => ({
          credential: credential.vc,
          rootHash: credential.rootHash,
          time: credential.issuanceDate,
          issuer: credential.issuer,
          status: 'approved'
        }));
  }, [credentials, pendingCredentials, type]);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 3
        }}
      >
        <Typography variant="h2">Credentials</Typography>
        <ImportCredential />
      </Box>
      <Tabs onChange={(_, value) => setType(value)} value={type}>
        <Tab label="All credentials" />
        <Tab label="Attested" />
      </Tabs>
      <Box>
        <Grid columns={{ xs: 4, sm: 8, lg: 12 }} container spacing={3}>
          {list.map(({ credential, issuer, rootHash, status, time }, index) => (
            <Grid key={index} lg={4} xl={3} xs={4}>
              <CredentialCell
                credential={credential}
                issuer={issuer}
                rootHash={rootHash}
                status={status}
                time={time}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default Claims;
