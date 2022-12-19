// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';

import { CacheDB, DB, DidDB } from './db';

export const cacheDB = new CacheDB();

const multiDB = new Map<string, DB>();

export function initMultiDB(names: string[]) {
  names.forEach((name) => multiDB.set(name, new DB(cacheDB, new DidDB(name))));
}

export function getDB(nameOrDB: string | DB): DB {
  if (nameOrDB instanceof DB) {
    return nameOrDB;
  }

  const db = multiDB.get(nameOrDB);

  assert(db, `DB: [${nameOrDB}] not found, try to call initMultiDB`);

  return db;
}
