// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { isRelease } from '../isRelease';
import { CTypeMeta } from './type';

export const ctypeMeta: Record<HexString, CTypeMeta> = {
  // World Cup Games
  '0xddd55777a3be0f8b848b94ddd98c2c4716add21dc50787ac65534b37f1b5bba5': {
    type: 'issue',
    icon: 'world-cup-games/icon.png',
    card: 'world-cup-games/card.webp',
    bg: 'world-cup-games/bg.webp'
  },
  '0x4394e5a3f6d7e18957d02095d46e37558e2502bce59aacd407b074781d7d6b5b': {
    type: 'issue',
    icon: 'world-cup-games/icon.png',
    card: 'world-cup-games/card.webp',
    bg: 'world-cup-games/bg.webp'
  }
};

export const TOP_CTYPES_FOR_ISSUE: HexString[] = isRelease
  ? ['0x4394e5a3f6d7e18957d02095d46e37558e2502bce59aacd407b074781d7d6b5b']
  : ['0x3f5d294d77ba0bb4eb6a3c4c7a6dec80c507e1910d73f8e38a4429fb2b12837c'];

export const TOP_CTYPES_FOR_ATTEST: HexString[] = isRelease ? [] : [];

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
