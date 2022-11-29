// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import type { CTypeMeta } from '@credential/app-config/ctypes/type';

import { useMemo } from 'react';

import { getCTypeMeta } from '@credential/app-config/ctypes';

export function useCTypeMeta(id: HexString): CTypeMeta | undefined {
  return useMemo(() => getCTypeMeta(id), [id]);
}
