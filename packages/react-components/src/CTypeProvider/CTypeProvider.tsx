// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { assert } from '@polkadot/util';
import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

import {
  allCacheCTypes,
  allCTypes,
  CacheCType,
  CType,
  deleteCType as deleteCTypeDB,
  putCacheCType,
  putCType
} from '@credential/app-store';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';
import { useLiveQuery } from '@credential/react-hooks';

interface State {
  serverCTypes: CacheCType[];
  ctypes: CType[];
  importCType: (hash: HexString) => void;
  deleteCType: (hash: HexString) => void;
}

export const CTypeContext = createContext<State>({} as State);

function CTypeProvider({ children }: { children: React.ReactNode }) {
  const { did } = useContext(DidsContext);
  const ctypes = useLiveQuery(allCTypes);
  const serverCTypes = useLiveQuery(allCacheCTypes);

  useEffect(() => {
    resolver.getClaimerCtypes(did.id).then((ctypes) => {
      ctypes.forEach((ctype) => putCType(ctype.rawData));
    });
  }, [did.id]);

  useEffect(() => {
    resolver.getAllCtypes().then((data) => {
      data.forEach((d) => putCacheCType(d.rawData));
    });
  }, []);

  const importCType = useCallback(
    async (hash: HexString) => {
      const ctype = await resolver.submitClaimerImportCtype(did.id, hash);

      putCType(ctype);
    },
    [did.id]
  );

  const deleteCType = useCallback(
    (hash: HexString) => {
      assert(did.id, 'did not found');

      resolver.deleteClaimerImportCtype(did.id, hash);
      deleteCTypeDB(hash);
    },
    [did]
  );

  const value = useMemo(() => {
    return {
      importCType,
      deleteCType,
      serverCTypes: serverCTypes ?? [],
      ctypes: ctypes ?? []
    };
  }, [ctypes, deleteCType, importCType, serverCTypes]);

  return <CTypeContext.Provider value={value}>{children}</CTypeContext.Provider>;
}

export default React.memo<typeof CTypeProvider>(CTypeProvider);
