// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { Did } from '@zcloak/did';

import UnlockModal from '@credential/react-dids/UnlockModal';
import { useToggle } from '@credential/react-hooks';

import { didManager } from './instance';
import { DidsState } from './types';

export const DidsContext = createContext({} as DidsState);

let unlockPromiseResolve: () => void;
let unlockPromiseReject: (error: Error) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
const DidsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [unlockOpen, toggleUnlock] = useToggle();
  const [all, setAll] = useState<Did[]>(didManager.getAll());
  const [did, setDid] = useState<Did | null>(all.length > 0 ? all[0] : null);

  useEffect(() => {
    const didChange = () => {
      const all = didManager.getAll();
      const did = all.length > 0 ? all[0] : null;

      setAll(didManager.getAll());
      setDid(did);
    };

    didManager.on('add', didChange);
    didManager.on('remove', didChange);

    return () => {
      didManager.off('add', didChange);
      didManager.off('remove', didChange);
    };
  }, [did]);

  const unlock = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      unlockPromiseResolve = resolve;
      unlockPromiseReject = reject;
      toggleUnlock();
    });
  }, [toggleUnlock]);

  const value: DidsState = useMemo(
    (): DidsState => ({
      all,
      did,
      unlock
    }),
    [all, did, unlock]
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
          }}
          open
        />
      )}
    </DidsContext.Provider>
  );
};

export default React.memo<typeof DidsProvider>(DidsProvider);
