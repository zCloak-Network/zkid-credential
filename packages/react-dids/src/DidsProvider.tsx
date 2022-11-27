// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { Did } from '@zcloak/did';

import UnlockModal from '@credential/react-dids/UnlockModal';
import { useToggle } from '@credential/react-hooks';

import { didManager, keyring } from './instance';
import { DidsState } from './types';

export const DidsContext = createContext({} as DidsState);

let unlockPromiseResolve: () => void;
let unlockPromiseReject: (error: Error) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
const DidsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [unlockOpen, toggleUnlock] = useToggle();
  const [all, setAll] = useState<Did[]>(didManager.all());
  const [did, setDid] = useState<Did>(didManager.current());
  const [isLocked, setIsLocked] = useState<boolean>(true);

  useEffect(() => {
    const didChange = () => {
      setAll(didManager.all());
      setDid(didManager.current());
    };

    didManager.on('add', didChange);
    didManager.on('remove', didChange);

    return () => {
      didManager.off('add', didChange);
      didManager.off('remove', didChange);
    };
  }, []);

  useEffect(() => {
    if (did) {
      setIsLocked(
        Array.from(did.keyRelationship.values())
          .map(({ publicKey }) => keyring.getPair(publicKey).isLocked)
          .includes(true)
      );
    }
  }, [did]);

  const unlock = useCallback((): Promise<void> => {
    if (!isLocked) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      unlockPromiseResolve = resolve;
      unlockPromiseReject = reject;
      toggleUnlock();
    });
  }, [isLocked, toggleUnlock]);

  const lock = useCallback(() => {
    if (did) {
      Array.from(did.keyRelationship.values()).forEach(({ publicKey }) =>
        keyring.getPair(publicKey).lock()
      );
      setIsLocked(true);
    }
  }, [did]);

  const value: DidsState = useMemo(
    (): DidsState => ({
      all,
      did,
      isLocked,
      lock,
      unlock
    }),
    [all, did, isLocked, lock, unlock]
  );

  return (
    <DidsContext.Provider value={value}>
      {children}
      {unlockOpen && (
        <UnlockModal
          onClose={() => {
            unlockPromiseReject(new Error('User reject'));
            toggleUnlock();
          }}
          onUnlock={() => {
            unlockPromiseResolve();
            toggleUnlock();
            setIsLocked(false);
          }}
          open
        />
      )}
    </DidsContext.Provider>
  );
};

export default React.memo<typeof DidsProvider>(DidsProvider);
