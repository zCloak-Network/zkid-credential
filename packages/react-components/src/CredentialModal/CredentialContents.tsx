// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { CredentialSubject } from '@zcloak/vc/types';

import { Box, Divider, lighten, Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

import { IconLogoCircle } from '@credential/app-config/icons';
import { CredentialStatus } from '@credential/app-store/pending-credential';
import { DidName } from '@credential/react-dids';

import ClaimDisplay, { ClaimItem } from '../ClaimDisplay';
import CredentialStatusDisplay from '../CredentialStatusDisplay';
import CTypeName from '../CTypeName';

interface Props {
  ctypeHash: HexString;
  owner: DidUrl;
  status: CredentialStatus;
  attester: DidUrl;
  contents: CredentialSubject;
}

const CredentialContents: React.FC<Props> = ({ attester, contents, ctypeHash, owner, status }) => {
  return (
    <Paper
      sx={({ palette }) => ({
        background: lighten(palette.primary.main, 0.92),
        borderRadius: 2.5,
        marginTop: '94px'
      })}
      variant="outlined"
    >
      <Stack alignItems="center" marginBottom={5.5} marginTop="-30px" spacing={2}>
        <IconLogoCircle sx={{ width: 60, height: 60 }} />
        <Box textAlign="center">
          <Typography variant="h3">
            <CTypeName cTypeHash={ctypeHash} />
          </Typography>
          <Typography>
            <CredentialStatusDisplay revoked={false} showText={false} status={status} />
            <Link marginLeft={1}>
              Attested by: <DidName value={attester} />
            </Link>
          </Typography>
        </Box>
      </Stack>
      <ClaimItem label="Credential owner" value={<DidName value={owner} />} />
      <Divider sx={({ palette }) => ({ marginY: 3, borderColor: palette.grey[300] })} />
      <Box paddingBottom={5}>
        <ClaimDisplay contents={contents} />
      </Box>
    </Paper>
  );
};

export default React.memo(CredentialContents);
