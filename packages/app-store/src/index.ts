// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DB } from './db';

export * from './ctype';
export * from './credential';

export function getDB(name: string) {
  return new DB(name);
}
