// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import { stringToHex } from '@polkadot/util';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { ZkidWalletProvider } from '@zcloak/login-providers';

interface ZkidExtensionState {
  provider?: ZkidWalletProvider;
  importCredential(credential: VerifiableCredential): Promise<void>;
}

export const ZkidExtensionContext = createContext<ZkidExtensionState>({} as ZkidExtensionState);

const readyPromise = new Promise<void>((resolve) => {
  if (document.readyState === 'complete') {
    resolve();
  } else {
    window.addEventListener('load', () => resolve());
  }
});

// eslint-disable-next-line @typescript-eslint/ban-types
const ZkidExtensionProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [provider, setProvider] = useState<ZkidWalletProvider>();

  useEffect(() => {
    readyPromise.then(() => {
      setProvider(new ZkidWalletProvider());
    });
  }, []);

  const importCredential = useCallback(
    async (credential: VerifiableCredential) => {
      if (!provider) {
        throw new Error('zkID Wallet not install');
      }

      await provider.importCredential(stringToHex(JSON.stringify(credential)));
    },
    [provider]
  );

  return (
    <ZkidExtensionContext.Provider value={{ importCredential, provider }}>
      {children}
    </ZkidExtensionContext.Provider>
  );
};

export default ZkidExtensionProvider;
