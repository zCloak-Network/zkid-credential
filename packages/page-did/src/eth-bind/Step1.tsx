// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { ZKSBT_CHAIN_ID } from '@credential/app-config';
import { ButtonEnableMetamask, Stack, Typography, useNetwork, useSwitchNetwork } from '@credential/react-components';

const Step1: React.FC<{ next: () => void }> = ({ next }) => {
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const changeNetwork = useCallback(async () => {
    if (chain?.id !== ZKSBT_CHAIN_ID) {
      try {
        switchNetworkAsync && (await switchNetworkAsync(ZKSBT_CHAIN_ID));

        next();
      } catch (error) {}
    } else {
      next();
    }
  }, [switchNetworkAsync, chain, next]);

  return (
    <Stack mt={5} spacing={6}>
      <Typography
        sx={({ palette }) => ({
          color: palette.grey[700]
        })}
        textAlign='center'
        variant='inherit'
      >
        Connect with your Ethereum address
      </Typography>
      <ButtonEnableMetamask
        disabled={!switchNetworkAsync}
        onClick={changeNetwork}
        onEnable={next}
        size='large'
        variant='contained'
      >
        Connect Wallet
      </ButtonEnableMetamask>
    </Stack>
  );
};

export default Step1;
