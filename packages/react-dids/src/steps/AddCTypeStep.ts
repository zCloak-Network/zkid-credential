// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';

import { assert } from '@polkadot/util';

export async function addCtype(ctype?: CType | null): Promise<void> {
  assert(ctype, 'No ctype found');

  // TODO: upload ctype
  return Promise.resolve();
}
