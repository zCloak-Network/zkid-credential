// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Did } from '@zcloak/did';

import UnlockModal from '@credential/react-dids/UnlockModal';

import { didManager, keyring, resolver } from './instance';
import { isLoginDid } from './is';
import { DidRole, DidsState } from './types';

function getIsLocked(did: Did) {
  if (isLoginDid(did)) {
    return false;
  }

  try {
    return Array.from(did.keyRelationship.values())
      .map(({ publicKey }) => keyring.getPair(publicKey).isLocked)
      .includes(true);
  } catch {
    return true;
  }
}

export const DidsContext = createContext({} as DidsState);

function DidsProvider({ children, didRole }: { didRole: DidRole; children: React.ReactNode }) {
  const location = useLocation();
  const [all, setAll] = useState<Did[]>(didManager.all());
  const [did, setDid] = useState<Did | null>(didManager.current);
  const [isLocked, setIsLocked] = useState<boolean>(
    didManager.current ? getIsLocked(didManager.current) : true
  );

  useEffect(() => {
    const didChange = () => {
      setAll(didManager.all());
    };

    didManager.on('add', didChange);
    didManager.on('remove', didChange);

    return () => {
      didManager.off('add', didChange);
      didManager.off('remove', didChange);
    };
  }, []);

  const lock = useCallback(() => {
    if (did) {
      Array.from(did.keyRelationship.values()).forEach(({ publicKey }) =>
        keyring.getPair(publicKey).lock()
      );
      setIsLocked(true);
    }
  }, [did]);

  const unUnlock = useCallback(() => {
    setIsLocked(false);
  }, []);

  useEffect(() => {
    if (did && !isLocked && !isLoginDid(did)) {
      resolver.resolve(did.id).catch(async () => {
        const publishDocument = await did.getPublish();

        return resolver.submitDid(publishDocument);
      });
    }
  }, [did, isLocked]);

  const switchDid = useCallback((did: Did) => {
    didManager.setCurrent(did);
    setDid(did);
  }, []);

  return did ? (
    <DidsContext.Provider
      value={{
        didRole,
        all,
        did,
        isLocked,
        lock,
        switchDid
      }}
    >
      {isLocked ? <UnlockModal did={did} onUnlock={unUnlock} open /> : children}
    </DidsContext.Provider>
  ) : (
    <Navigate to={{ pathname: '/account', search: `?redirect=${location.pathname}` }} />
  );
}

export default React.memo<typeof DidsProvider>(DidsProvider);
