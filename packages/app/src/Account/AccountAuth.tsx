// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Did } from '@zcloak/did';

import type { DidRole } from '@credential/react-dids/types';

import React, { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { DidsProvider } from '@credential/react-dids';
import { didManager, keyring } from '@credential/react-dids/instance';

function getIsLocked() {
  try {
    return Array.from(didManager.current().keyRelationship.values())
      .map(({ publicKey }) => keyring.getPair(publicKey).isLocked)
      .includes(true);
  } catch {
    return true;
  }
}

const AccountAuth: React.FC<React.PropsWithChildren<{ didRole: DidRole }>> = ({
  children,
  didRole
}) => {
  const [all, setAll] = useState<Did[]>(didManager.all());
  const [did, setDid] = useState<Did | undefined>(didManager.current());
  const [isLocked, setIsLocked] = useState<boolean>(getIsLocked());

  useEffect(() => {
    const didChange = () => {
      setAll(didManager.all());
      setDid(didManager.current());

      if (didManager.current()) {
        setIsLocked(getIsLocked());
      }
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

  return did ? (
    <DidsProvider all={all} did={did} isLocked={isLocked} lock={lock} unUnlock={unUnlock}>
      {children}
    </DidsProvider>
  ) : (
    <Navigate
      to={{
        pathname: '/account',
        search: `?redirect=${didRole}`
      }}
    />
  );
};

export default React.memo(AccountAuth);
