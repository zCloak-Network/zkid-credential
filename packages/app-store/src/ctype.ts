// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType as CTypeInterface } from '@zcloak/ctype/types';

import { HexString } from '@zcloak/crypto/types';

import { didManager } from '@credential/react-dids/instance';

export type CType = CTypeInterface;

export function allCTypes(): Promise<CType[]> {
  return didManager.db.ctype.toArray();
}

export function getCType(id?: HexString | null): Promise<CType | undefined> {
  if (id) {
    return didManager.db.ctype.get(id);
  }

  return Promise.resolve(undefined);
}

export async function putCType(ctype: CType): Promise<void> {
  await didManager.db.ctype.put(ctype);
}

export async function deleteCType(id: HexString): Promise<void> {
  await didManager.db.ctype.delete(id);
}
