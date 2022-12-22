// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidDocument, DidUrl } from '@zcloak/did-resolver/types';

import { didManager } from '@credential/react-dids/instance';

export interface CacheDid {
  did: DidUrl;
  document: DidDocument;
}

export async function allDidDocuments(): Promise<DidDocument[]> {
  return (await didManager.cacheDB.cacheDid.toArray()).map((data) => data.document);
}

export async function allDids(): Promise<DidUrl[]> {
  return (await didManager.cacheDB.cacheDid.toArray()).map((data) => data.did);
}

export function queryDid(did: string): Promise<DidDocument | null | undefined> {
  return didManager.cacheDB.cacheDid.get({ did }).then((data) => data?.document);
}

export async function putDid(document: DidDocument): Promise<void> {
  await didManager.cacheDB.cacheDid.put({ did: document.id, document });
}
