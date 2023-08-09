// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext } from 'react';

import {
  ConnectWallet,
  NotificationContext,
  Stack,
  Typography,
  useNetwork,
  useSwitchNetwork
} from '@credential/react-components';

const Step1: React.FC<{ next: () => void }> = ({ next }) => {
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();
  const { notifyError } = useContext(NotificationContext);

  const changeNetwork = useCallback(() => {
    if (chains.filter((_c) => _c.id === chain?.id).length) {
      next();
    } else {
      notifyError(new Error("Your wallet's current network is unsupported."));
    }
  }, [chains, chain, next, notifyError]);

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
      <ConnectWallet onClick={changeNetwork} onEnable={next} size='large' variant='contained'>
        Connect Wallet
      </ConnectWallet>
    </Stack>
  );
};

export default Step1;
