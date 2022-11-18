// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { getDB } from '.';

export function useDB(name?: string | null) {
  return useMemo(() => (name ? getDB(name) : null), [name]);
}
