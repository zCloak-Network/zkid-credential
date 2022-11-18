// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useEffect, useMemo, useState } from 'react';

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
  const did = useMemo(() => (all.length > 0 ? all[0] : null), [all]);

  useEffect(() => {
    const didChange = () => setAll(didManager.getAll());

    didManager.on('add', didChange);
    didManager.on('remove', didChange);

    return () => {
      didManager.off('add', didChange);
      didManager.off('remove', didChange);
    };
  }, []);

  const value: DidsState = useMemo(
    (): DidsState => ({
      all,
      did
    }),
    [all, did]
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
