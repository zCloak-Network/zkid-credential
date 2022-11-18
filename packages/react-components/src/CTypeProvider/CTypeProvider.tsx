// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { CType, useCTypes } from '@credential/app-store';
import { DidsContext } from '@credential/react-dids';

interface State {
  ctypes: CType[];
  importCType: (hash: HexString) => void;
  deleteCType: (hash: HexString) => void;
}

export const CTypeContext = createContext<State>({} as State);

// eslint-disable-next-line @typescript-eslint/ban-types
const CTypeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { did } = useContext(DidsContext);
  const ctypes = useCTypes(did?.id);

  const importCType = useCallback(async (hash: HexString) => {
    // TODO
    return Promise.resolve();
  }, []);

  const deleteCType = useCallback(async (hash: HexString) => {
    // TODO
    return Promise.resolve();
  }, []);

  const value = useMemo(() => {
    return {
      importCType,
      deleteCType,
      ctypes: ctypes ?? []
    };
  }, [ctypes, deleteCType, importCType]);

  return <CTypeContext.Provider value={value}>{children}</CTypeContext.Provider>;
};

export default React.memo<typeof CTypeProvider>(CTypeProvider);
