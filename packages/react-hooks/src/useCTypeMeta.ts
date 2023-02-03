// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import type { CTypeMeta } from '@credential/app-config/ctypes/type';

import { useMemo } from 'react';

import {
  getCTypeMetaForAttest,
  getCTypeMetaForCredential,
  getCTypeMetaForIssue
} from '@credential/app-config/ctypes';

export function useCTypeMetaForIssue(id: HexString): CTypeMeta | undefined {
  return useMemo(() => getCTypeMetaForIssue(id), [id]);
}

export function useCTypeMetaForAttest(id: HexString): CTypeMeta | undefined {
  return useMemo(() => getCTypeMetaForAttest(id), [id]);
}

export function useCTypeMetaForCredential(id?: HexString): CTypeMeta | undefined {
  return useMemo(() => {
    return id ? getCTypeMetaForCredential(id) : undefined;
  }, [id]);
}
