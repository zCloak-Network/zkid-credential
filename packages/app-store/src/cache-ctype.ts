// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType as CTypeInterface } from '@zcloak/ctype/types';

import { HexString } from '@zcloak/crypto/types';

import { didManager } from '@credential/react-dids/instance';

export type CacheCType = CTypeInterface;

export function allCacheCTypes(): Promise<CacheCType[]> {
  return didManager.cacheDB.cacheCType.toArray();
}

export function getCacheCType(id?: HexString | null): Promise<CacheCType | undefined> {
  if (id) {
    return didManager.cacheDB.cacheCType.get(id);
  }

  return Promise.resolve(undefined);
}

export async function putCacheCType(ctype: CacheCType): Promise<void> {
  await didManager.cacheDB.cacheCType.put(ctype);
}
