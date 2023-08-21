// Copyright 2021-2023 zcloak authors & contributors
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
  },
  '0x9884edce63d4de703c4b3ebf23063929705b7139ce2eeb3b6631c2fa25deb74f': {
    type: 'all',
    card: 'christmas2022/bac_card1.webp'
  },
  '0x28b5f594de884efe23886d1ade88a48db1670644664780364a7e6a6c55ee5c63': {
    type: 'all',
    card: 'christmas2022/bac_card3.webp'
  },
  '0x15ea88be73bd78986a41141fc86497f0cfef4a0d1b5463d100758edca37c546b': {
    type: 'all',
    card: 'christmas2022/bac_card2.webp'
  },
  // legal-dao
  '0xa99186086d83f834f0bf951cb7f78cd142f147f3bd7a689086f157418944716c': {
    type: 'attest',
    card: 'legal-dao/bg2.jpeg',
    icon: 'legal-dao/icon.jpeg',
    color: '#FFFFFF'
  },
  '0xfd4a31cc472ab8fa4fdb8a1096cb3e8fc52514c92193602f5996b912ed898b02': {
    type: 'attest',
    card: 'legal-dao/bg2.jpeg',
    icon: 'legal-dao/icon.jpeg',
    color: '#FFFFFF'
  },
  // hk-event
  '0x6c62809700813f4ffb59ea97a31f4d34e206a4233bc2bb75bed1d705c4314930': {
    type: 'all',
    card: 'hk-event/bag_card_edcon.png',
    icon: 'hk-event/icon_logo.png'
  },
  // dao salon
  '0x541556a04e6d3deccaa2884ae840596cdfe4de597a8334878181ee76aaee745f': {
    type: 'all',
    card: 'hk-event/bag_card_shanghai.svg',
    icon: 'hk-event/icon_logo.png'
  },
  // yantai event
  '0x341829ca64a7105ff941b4b8a9710e2806053cbfb7c97fc9cfd569ab4b5d55d2': {
    type: 'all',
    card: 'yantai-event/bag_card_yantai.svg',
    icon: 'hk-event/icon_logo.png'
  },
  // shanghai event
  '0xf9dd4e34e40fa434ba96541beccd7b1c7762836f5aa320924248b7604a505462': {
    type: 'all',
    card: 'shanghai-event/bag_card_global.svg'
  },
  // shenzhen event
  '0x3257b78e3cf6e21b5a346a2d714d656f3379175e48d7f9abf098b3b0d1ed324b': {
    type: 'all',
    card: 'shanghai-event/bag_card_global.svg'
  }
};

export const TOP_CTYPES_FOR_ISSUE: HexString[] = isRelease
  ? [
      '0x28b5f594de884efe23886d1ade88a48db1670644664780364a7e6a6c55ee5c63',
      '0x15ea88be73bd78986a41141fc86497f0cfef4a0d1b5463d100758edca37c546b',
      '0x9884edce63d4de703c4b3ebf23063929705b7139ce2eeb3b6631c2fa25deb74f',
      '0x4394e5a3f6d7e18957d02095d46e37558e2502bce59aacd407b074781d7d6b5b'
    ]
  : [
      '0x9884edce63d4de703c4b3ebf23063929705b7139ce2eeb3b6631c2fa25deb74f',
      '0xddd55777a3be0f8b848b94ddd98c2c4716add21dc50787ac65534b37f1b5bba5'
    ];

export const TOP_CTYPES_FOR_ATTEST: HexString[] = isRelease
  ? [
      // '0x28b5f594de884efe23886d1ade88a48db1670644664780364a7e6a6c55ee5c63',
      // '0x15ea88be73bd78986a41141fc86497f0cfef4a0d1b5463d100758edca37c546b',
      // '0x9884edce63d4de703c4b3ebf23063929705b7139ce2eeb3b6631c2fa25deb74f'
    ]
  : [];

export function getCTypeMetaForIssue(id: HexString): CTypeMeta | undefined {
  const meta: CTypeMeta | undefined = getCTypeMeta(id);

  return meta && ['all', 'issue'].includes(meta.type) ? meta : undefined;
}

export function getCTypeMetaForAttest(id: HexString): CTypeMeta | undefined {
  const meta: CTypeMeta | undefined = getCTypeMeta(id);

  return meta && ['all', 'attest'].includes(meta.type) ? meta : undefined;
}

export function getCTypeMeta(id: HexString): CTypeMeta | undefined {
  const meta: CTypeMeta | undefined = ctypeMeta[id];

  return meta ?? undefined;
}
