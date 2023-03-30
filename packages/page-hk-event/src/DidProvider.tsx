// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { Did } from '@zcloak/did';
import { LoginDid } from '@zcloak/login-did';

import { didManager, provider } from '@credential/react-dids/instance';

interface State {
  did?: Did | null;
  getDid: () => Promise<void>;
}

export const DidContext = createContext({} as State);

async function loginWithZkID(force = false) {
  if (!provider) return;

  return force || (await provider.isAuth()) ? LoginDid.fromProvider(provider) : undefined;
}

const DidProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [did, setDid] = useState<Did | null>(didManager.current);

  const getDid = useCallback(async () => {
    const did = await loginWithZkID(true);

    if (did) {
      setDid(did);
      didManager.setCurrent(did);
    }
  }, []);

  useEffect(() => {
    const didChanged = () => {
      const did = didManager.current;

      setDid(did);
    };

    didManager.on('changed', didChanged);

    return () => {
      didManager.off('changed', didChanged);
    };
  }, []);

  return <DidContext.Provider value={{ did, getDid }}>{children}</DidContext.Provider>;
};

export default DidProvider;
