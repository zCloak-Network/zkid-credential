// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';

import { CTypeName } from '@credential/react-components';
import { DidName } from '@credential/react-dids';

interface Props {
  vc: VerifiableCredential<boolean>;
}

function Item({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <Stack
      bgcolor='#FBFAFC'
      border='1px solid #EBEAED'
      direction='row'
      display='inline-flex'
      lineHeight={'18px'}
      maxWidth={520}
      paddingX={2}
      paddingY={1}
    >
      <Box sx={{ width: 90 }}>{label}</Box>
      <Box sx={{ color: '#5D5D5B' }}>{value}</Box>
    </Stack>
  );
}

function Top({ vc }: Props) {
  return (
    <Box sx={{ bgcolor: 'common.white', paddingTop: '36px', paddingBottom: '20px' }}>
      <Container maxWidth='xl' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h1'>Mint zkID Card</Typography>
        <Item label='cType:' value={<CTypeName cTypeHash={vc.ctype} />} />
        <Item label='Attester:' value={<DidName shorten={false} value={vc.issuer} />} />
      </Container>
    </Box>
  );
}

export default React.memo(Top);
