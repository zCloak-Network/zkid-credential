// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import type { CTypeMeta } from '@credential/app-config/ctypes/type';

import { useMemo } from 'react';

import { getCTypeMeta, getCTypeMetaForAttest, getCTypeMetaForIssue } from '@credential/app-config/ctypes';

export function useCTypeMetaForIssue(id: HexString): CTypeMeta | undefined {
  return useMemo(() => getCTypeMetaForIssue(id), [id]);
}

export function useCTypeMetaForAttest(id: HexString): CTypeMeta | undefined {
  return useMemo(() => getCTypeMetaForAttest(id), [id]);
}

export function useCTypeMeta(id?: HexString): CTypeMeta | undefined {
  return useMemo(() => {
    return id ? getCTypeMeta(id) : undefined;
  }, [id]);
}
