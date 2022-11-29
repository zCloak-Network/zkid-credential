// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useEffect } from 'react';

import UnlockModal from '@credential/react-dids/UnlockModal';

import { resolver } from './instance';
import { DidsState } from './types';

export const DidsContext = createContext({} as DidsState);

const DidsProvider: React.FC<React.PropsWithChildren<DidsState & { unUnlock: () => void }>> = ({
  all,
  children,
  did,
  isLocked,
  lock,
  unUnlock
}) => {
  useEffect(() => {
    if (did) {
      resolver.resolve(did.id).catch(() => {
        const publishDocument = did.getPublish();

        return resolver.submitDid(publishDocument);
      });
    }
  }, [did]);

  return (
    <DidsContext.Provider
      value={{
        all,
        did,
        isLocked,
        lock
      }}
    >
      {isLocked ? <UnlockModal onUnlock={unUnlock} open /> : children}
    </DidsContext.Provider>
  );
};

export default React.memo<typeof DidsProvider>(DidsProvider);
