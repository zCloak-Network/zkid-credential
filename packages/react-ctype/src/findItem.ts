// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { InstanceType } from '@zcloak/ctype/types';
import type { ItemMap, ItemProps } from './types';

import CTypeBool from './CTypeBool';
import CTypeInput from './CTypeInput';
import CTypeInputNumber from './CTypeInputNumber';

const itemMap: ItemMap = {
  string: CTypeInput,
  array: CTypeInput,
  null: CTypeInput,
  number: CTypeInputNumber,
  integer: CTypeInputNumber,
  boolean: CTypeBool
};

export function findItem(type?: InstanceType): React.FC<ItemProps> {
  return itemMap[type || 'string'];
}
