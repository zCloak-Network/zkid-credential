// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { assert } from '@polkadot/util';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { CType, useCTypes } from '@credential/app-store';
import { useDB } from '@credential/app-store/useDB';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

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
  const db = useDB(did?.id);

  const importCType = useCallback(
    async (hash: HexString) => {
      // TODO import claimer ctype

      assert(did?.id, 'did not found');
      assert(db, 'index db not init');

      const ctype = await resolver.submitClaimerImportCtype(did.id, hash);

      await db.ctype.put(ctype);
    },
    [did, db]
  );

  // TODO delete claimer ctype
  const deleteCType = useCallback(
    async (hash: HexString) => {
      assert(did?.id, 'did not found');
      assert(db, 'index db not init');

      await resolver.deleteClaimerImportCtype(did.id, hash);
      await db.ctype.delete(hash);
    },
    [did, db]
  );

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
