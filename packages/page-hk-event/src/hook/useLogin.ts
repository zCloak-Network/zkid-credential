// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useEffect, useState } from 'react';

import { BrowserStore } from '@zcloak/ui-store';

import { LOGGED_PREFIX } from '@credential/app-config';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

export const store = new BrowserStore();

interface WhiteProps {
  did: string;
  name?: string;
}

export function useLogin() {
  const { did } = useContext(DidsContext);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [org, setOrg] = useState<WhiteProps>();
  const [error, setError] = useState<Error>();

  const initWhiteList = useCallback(async () => {
    const res = await resolver.hkEventLogin(did.id);

    if (res.inWhitelist) {
      setError(undefined);
      const key = `${LOGGED_PREFIX}${did.id}`;

      await store.set(key, Date.now());
      setIsLogged(true);
      setOrg({
        did: did.id,
        name: res.orgName
      });
    } else {
      setError(new Error('You don’t have Access.'));
      setIsLogged(false);
    }
  }, [did.id]);

  const login = useCallback(async () => {
    await initWhiteList();
  }, [initWhiteList]);

  const logout = useCallback(async () => {
    const key = `${LOGGED_PREFIX}${did.id}`;

    await store.remove(key);
    setIsLogged(false);
    setOrg(undefined);
  }, [did]);

  useEffect(() => {
    const key = `${LOGGED_PREFIX}${did.id}`;

    store.get(key).then((val) => {
      if (val) {
        initWhiteList();
      } else {
        setIsLogged(false);
      }
    });
  }, [did, initWhiteList]);

  return {
    error,
    login,
    logout,
    org,
    isLogged
  };
}
