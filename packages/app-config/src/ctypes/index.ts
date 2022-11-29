// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { CTypeMeta } from './type';

export const ctypeMeta: Record<HexString, CTypeMeta> = {
  // World Cup Games
  '0x3f5d294d77ba0bb4eb6a3c4c7a6dec80c507e1910d73f8e38a4429fb2b12837c': {
    icon: 'world-cup-games/icon.png',
    card: 'world-cup-games/card.webp',
    bg: 'world-cup-games/bg.webp'
  }
};

export const TOP_CTYPES: HexString[] = [
  '0x3f5d294d77ba0bb4eb6a3c4c7a6dec80c507e1910d73f8e38a4429fb2b12837c'
];

export function getCTypeMeta(id: HexString): CTypeMeta | undefined {
  return ctypeMeta[id];
}
