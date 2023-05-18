// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';
import type { SbtResult } from './types';

import { Box, Container, Stack, Typography } from '@mui/material';

import { Button, ButtonEnableMetamask, ellipsisMixin, SbtCard } from '@credential/react-components';

interface Props {
  vc: VerifiableCredential<boolean>;
  result: SbtResult;
  onCancel: () => void;
}

function Mint({ onCancel, result, vc }: Props) {
  return (
    <Container
      maxWidth='md'
      sx={{
        marginTop: 2,
        maxWidth: '720px !important',
        bgcolor: 'common.white'
      }}
    >
      <Stack
        spacing={5}
        sx={{
          padding: '48px 80px'
        }}
      >
        <Box textAlign='center'>
          <Typography variant='h2'>Mint zkID Card</Typography>
          <Typography
            sx={{
              background: '#FBFAFC',
              borderRadius: '4px',
              border: '1px solid #EBEAED',
              padding: '8px 16px',
              color: '#5D5D5B',
              marginTop: 2,
              ...ellipsisMixin()
            }}
          >
            cType: {vc.ctype}
          </Typography>
        </Box>
        <Box>
          <Typography variant='h6'>Preview</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 6 }}>
            <SbtCard attester={vc.issuer} multiply={1.2} output={result.desc} />
          </Box>
        </Box>
        <Box>
          <ButtonEnableMetamask fullWidth size='large' variant='contained'>
            Mint
          </ButtonEnableMetamask>
          <Button color='secondary' fullWidth onClick={onCancel} size='large' sx={{ marginTop: 3 }} variant='contained'>
            Cancel
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default Mint;
