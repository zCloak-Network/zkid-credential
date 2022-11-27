// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType as CTypeInterface } from '@zcloak/ctype/types';

import { useLiveQuery } from 'dexie-react-hooks';

import { HexString } from '@zcloak/crypto/types';

import { db } from './db';

export type CType = CTypeInterface;

export function useCTypes(): CType[] | undefined {
  return useLiveQuery(() => db.ctype.toArray() ?? [], []);
}

export function useCType(id?: HexString | null): CType | undefined {
  return useLiveQuery(() => {
    if (id) {
      return db.ctype.get(id);
    }

    return undefined;
  }, []);
}
