// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import type { CredentialStatus } from '@credential/app-store';

import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { useMemo } from 'react';

import { IconCredential, IconLogoCircle } from '@credential/app-config';
import { getCTypeMeta } from '@credential/app-config/ctypes';
import { Copy, CredentialStatusDisplay, CTypeName } from '@credential/react-components';
import { DidName } from '@credential/react-dids';

interface Props {
  status: CredentialStatus;
  vc: VerifiableCredential<boolean>;
}

function CredentialDetails({ status, vc }: Props) {
  const meta = useMemo(() => getCTypeMeta(vc.ctype), [vc.ctype]);

  return (
    <Box sx={{ marginTop: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3, gap: 1.25 }}>
        <img src={IconCredential} width={40} />
        <Typography variant='h3'>Credential</Typography>
      </Box>
      <Grid
        bgcolor='common.white'
        columns={{ xs: 12 }}
        container
        marginTop={3}
        padding='8px 38px'
        spacing={3}
        sx={{ '>.MuiGrid2-root': { display: 'flex', alignItems: 'center' } }}
      >
        <Grid md={3} xs={12}>
          {meta?.icon ? (
            <Box component='img' src={meta.icon} sx={{ width: 42, height: 42 }} />
          ) : (
            <IconLogoCircle sx={{ width: 42, height: 42 }} />
          )}
          <Typography ml={3} variant='h5'>
            <CTypeName cTypeHash={vc.ctype} />
          </Typography>
        </Grid>
        <Grid md={3} xs={12}>
          <Box>
            <Typography color='#8F95B2' fontSize={12}>
              Credential Type
            </Typography>
            <Typography sx={{ '>button': { ml: 1 } }}>
              {vc.ctype.slice(0, 8)}...{vc.ctype.slice(-6)}
              <Copy value={vc.ctype} />
            </Typography>
          </Box>
        </Grid>
        <Grid md={3} xs={12}>
          <Box>
            <Typography color='#8F95B2' fontSize={12}>
              Attested by
            </Typography>
            <Typography sx={{ '>button': { ml: 1 } }}>
              <DidName value={vc.issuer} />
              <Copy value={vc.issuer} />
            </Typography>
          </Box>
        </Grid>
        <Grid md={3} xs={12}>
          <CredentialStatusDisplay showText status={status} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CredentialDetails;
