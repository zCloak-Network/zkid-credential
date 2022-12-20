// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { getCredentials, getPendingCredentials } from '@credential/app-store';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid
} from '@credential/react-components';
import { useLiveQuery } from '@credential/react-hooks';

import CredentialCell, { CredentialProps } from './CredentialCell';
import ImportCredential from './ImportCredential';

const Claims: React.FC = () => {
  const [type, setType] = useState(0);
  const credentials = useLiveQuery(getCredentials, []);
  const pendingCredentials = useLiveQuery(getPendingCredentials, [['pending', 'rejected']]);

  const list = useMemo((): CredentialProps[] => {
    const _credentials = credentials ?? [];
    const _pendingCredentials = pendingCredentials ?? [];

    const _list: CredentialProps[] = _credentials
      .map(
        (credential): CredentialProps => ({
          credential: credential.vc,
          rootHash: credential.rootHash,
          time: credential.issuanceDate,
          issuer: credential.issuer,
          status: 'approved'
        })
      )
      .sort((l, r) => r.time - l.time);

    if (type === 0) {
      _list.unshift(
        ..._pendingCredentials
          .map((credential) => ({
            credential: credential.rawCredential,
            rootHash: credential.rootHash,
            time: credential.submitDate,
            issuer: credential.issuer,
            status: credential.status
          }))
          .sort((l, r) => r.time - l.time)
      );
    }

    return _list;
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
