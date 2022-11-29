// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { CTypeMeta } from './type';

export const ctypeMeta: Record<HexString, CTypeMeta> = {
  // World Cup Games
  '0x3f5d294d77ba0bb4eb6a3c4c7a6dec80c507e1910d73f8e38a4429fb2b12837c': {
    type: 'issue',
    icon: 'world-cup-games/icon.png',
    card: 'world-cup-games/card.webp',
    bg: 'world-cup-games/bg.webp'
  }
};

export const TOP_CTYPES_FOR_ISSUE: HexString[] = [
  '0x3f5d294d77ba0bb4eb6a3c4c7a6dec80c507e1910d73f8e38a4429fb2b12837c'
];

export const TOP_CTYPES_FOR_ATTEST: HexString[] = [];

export function getCTypeMetaForIssue(id: HexString): CTypeMeta | undefined {
  const meta: CTypeMeta | undefined = ctypeMeta[id];

  if (!meta) return undefined;

  return ['all', 'issue'].includes(meta.type) ? meta : undefined;
}

export function getCTypeMetaForAttest(id: HexString): CTypeMeta | undefined {
  const meta: CTypeMeta | undefined = ctypeMeta[id];

  if (!meta) return undefined;

  return ['all', 'attest'].includes(meta.type) ? meta : undefined;
}
