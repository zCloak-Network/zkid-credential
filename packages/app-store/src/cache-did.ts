// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidDocument, DidUrl } from '@zcloak/did-resolver/types';
import type { DB } from './db';

import { getDB } from './MultiDB';

export interface CacheDid {
  did: DidUrl;
  document: DidDocument;
}

export async function allDidDocuments(nameOrDB: string | DB): Promise<DidDocument[]> {
  const db = getDB(nameOrDB);

  return (await db.cacheDid.toArray()).map((data) => data.document);
}

export async function allDids(nameOrDB: string | DB): Promise<DidUrl[]> {
  const db = getDB(nameOrDB);

  return (await db.cacheDid.toArray()).map((data) => data.did);
}

export function queryDid(
  nameOrDB: string | DB,
  did: string
): Promise<DidDocument | null | undefined> {
  const db = getDB(nameOrDB);

  return db.cacheDid.get({ did }).then((data) => data?.document);
}

export async function putDid(nameOrDB: string | DB, document: DidDocument): Promise<void> {
  const db = getDB(nameOrDB);

  await db.cacheDid.put({ did: document.id, document });
}
