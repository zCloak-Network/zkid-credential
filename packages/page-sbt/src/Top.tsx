// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import type { VerifiableCredential } from '@zcloak/vc/types';

import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';

import {
  arbitrum,
  baseGoerli,
  ConnectWallet,
  EthWalletAddress,
  Network,
  useAccount
} from '@credential/react-components';

import Faucet from './Faucet';

const Top: React.FC<{ isTest: boolean }> = ({ isTest }) => {
  const { isConnected } = useAccount();

  return (
    <Box sx={{ bgcolor: 'common.white', paddingTop: '36px', paddingBottom: '20px' }}>
      <Container
        maxWidth='xl'
        sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h1'>Mint zkID Card</Typography>
        {isConnected ? (
          <Stack
            direction={{
              sm: 'row',
              xs: 'column'
            }}
            spacing={2}
          >
            <Faucet />
            <Network isTest={isTest} />
            <EthWalletAddress />
          </Stack>
        ) : (
          <ConnectWallet initialnetworkid={isTest ? baseGoerli.id : arbitrum.id} sx={{ width: 200 }} variant='outlined'>
            Connect Wallet
          </ConnectWallet>
        )}
      </Container>
    </Box>
  );
};

export default React.memo(Top);
