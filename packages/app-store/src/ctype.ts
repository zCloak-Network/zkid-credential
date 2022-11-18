// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType as CTypeInterface } from '@zcloak/ctype/types';

import { useLiveQuery } from 'dexie-react-hooks';

import { HexString } from '@zcloak/crypto/types';

import { useDB } from './useDB';

export type CType = CTypeInterface;

export function useCTypes(name?: string | null): CType[] | undefined {
  const db = useDB(name);

  return useLiveQuery(() => db?.ctype.toArray() ?? [], [db]);
}

export function useCType(id?: HexString | null, name?: string | null): CType | undefined {
  const db = useDB(name);

  return useLiveQuery(() => {
    if (id) {
      return db?.ctype.get(id);
    }

    return undefined;
  }, [db]);
}
