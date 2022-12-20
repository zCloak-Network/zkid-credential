// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ButtonProps } from '@mui/material';

import React, { useCallback, useState } from 'react';

import { LoginDid } from '@zcloak/login-did';

import { didManager, provider } from '@credential/react-dids/instance';

import Button from './Button';

interface Props extends ButtonProps {
  onDone?: (did: LoginDid) => void;
}

const ButtonWallet = React.forwardRef<any, Props>(function ({ onDone, ...props }, ref) {
  const [loading, setLoading] = useState(false);

  const loginWallet = useCallback(async () => {
    if (!provider) return;

    setLoading(true);

    try {
      await provider.requestAuth();
      const did = await LoginDid.fromProvider(provider);

      didManager.addDid(did);
      didManager.setCurrent(did);
      onDone?.(did);
    } finally {
      setLoading(false);
    }
  }, [onDone]);

  const download = useCallback(() => {
    window.open(
      'https://chrome.google.com/webstore/detail/zkid-wallet/hkdbehojhcibpbcdpjphajfbgigldjkh'
    );
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
