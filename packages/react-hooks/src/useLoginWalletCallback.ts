// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { LoginDid } from '@zcloak/login-did';

import { didManager, provider } from '@credential/react-dids/instance';

export function useLoginWalletCallback() {
  return useCallback(async () => {
    if (provider) {
      const challenge = new Date().getTime();

      await provider.requestAuthAndLogin(challenge);
      const did = await LoginDid.fromProvider(provider);

      didManager.addDid(did);
      didManager.setCurrent(did);

      return did;
    }

    return undefined;
  }, []);
}
