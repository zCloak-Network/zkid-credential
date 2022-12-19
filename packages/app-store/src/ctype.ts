// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType as CTypeInterface } from '@zcloak/ctype/types';

import { HexString } from '@zcloak/crypto/types';

import { DB } from './db';
import { getDB } from './MultiDB';

export type CType = CTypeInterface;

export function allCTypes(nameOrDB: string | DB): Promise<CType[]> {
  const db = getDB(nameOrDB);

  return db.ctype.toArray();
}

export function getCType(nameOrDB: string | DB, id?: HexString | null): Promise<CType | undefined> {
  const db = getDB(nameOrDB);

  if (id) {
    return db.ctype.get(id);
  }

  return Promise.resolve(undefined);
}

export async function putCType(nameOrDB: string | DB, ctype: CType): Promise<void> {
  const db = getDB(nameOrDB);

  await db.ctype.put(ctype);
}

export async function deleteCType(nameOrDB: string | DB, id: HexString): Promise<void> {
  const db = getDB(nameOrDB);

  await db.ctype.delete(id);
}
