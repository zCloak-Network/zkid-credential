// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { CredentialSubject, HashType } from '@zcloak/vc/types';

import { isHex } from '@polkadot/util';
import { useMemo } from 'react';

import { calcRoothash } from '@zcloak/vc';

export function useRootHash(
  input: CredentialSubject,
  hashType?: HashType,
  nonceMap?: Record<HexString, HexString>
): HexString {
  return useMemo(() => {
    return isHex(input) ? input : calcRoothash(input, hashType, nonceMap).rootHash;
  }, [hashType, input, nonceMap]);
}
