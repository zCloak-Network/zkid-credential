// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ButtonProps } from '@mui/material';

import React, { useCallback, useState } from 'react';

import { LoginDid } from '@zcloak/login-did';

import { provider } from '@credential/react-dids/instance';
import { useLoginWalletCallback } from '@credential/react-hooks';

import Button from './Button';

interface Props extends ButtonProps {
  onDone?: (did: LoginDid) => void;
}

const ButtonWallet = React.forwardRef<any, Props>(function ({ onDone, ...props }, ref) {
  const [loading, setLoading] = useState(false);
  const loginWalletCallback = useLoginWalletCallback();

  const loginWallet = useCallback(() => {
    if (!provider) return;

    setLoading(true);
    loginWalletCallback()
      .then((did) => {
        onDone?.(did as any);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onDone, loginWalletCallback]);

  const download = useCallback(() => {
    window.open('https://chrome.google.com/webstore/detail/zkid-wallet/ahkpfejaeoepmfopmbhjgjekibmfcfgo');
  }, []);

  return (
    <Button
      {...props}
      color={provider ? props.color : 'info'}
      disabled={loading}
      onClick={provider ? loginWallet : download}
      ref={ref}
    >
      {provider ? 'Login with zkID Wallet' : 'Download zkID Wallet'}
    </Button>
  );
});

export default ButtonWallet;
