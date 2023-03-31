// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useEffect, useState } from 'react';

import { BrowserStore } from '@zcloak/ui-store';

import { CTYPE_ID, LOGGED_PREFIX } from '@credential/app-config';
import { getCacheCType, putCacheCType } from '@credential/app-store';
import { resolver } from '@credential/react-dids/instance';

import { DidContext } from '../DidProvider';

export const store = new BrowserStore();

interface WhiteProps {
  did: string;
  name?: string;
}

export function useLogin() {
  const { did } = useContext(DidContext);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [org, setOrg] = useState<WhiteProps>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    getCacheCType(CTYPE_ID).then((ctype) => {
      if (!ctype) {
        resolver
          .getAllCtypes()
          .then((ctypes) => ctypes.filter((c) => c.id === CTYPE_ID)[0])
          .then((ctype) => putCacheCType(ctype.rawData));
      }
    });
  }, []);
  const initWhiteList = useCallback(async () => {
    if (!did) return;

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
  }, [did]);

  const login = useCallback(async () => {
    await initWhiteList();
  }, [initWhiteList]);

  const logout = useCallback(async () => {
    if (!did) return;

    const key = `${LOGGED_PREFIX}${did.id}`;

    await store.remove(key);
    setIsLogged(false);
    setOrg(undefined);
  }, [did]);

  useEffect(() => {
    if (!did) return;

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
