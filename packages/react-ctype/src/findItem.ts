// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { CTypeSchema, InstanceType } from '@zcloak/ctype/types';
import type { CTypeSchemaProps, ItemMap, ItemProps } from './types';

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

export function findItem(schema: CTypeSchema): React.ComponentType<CTypeSchemaProps> {
  return itemMap[type || 'string'];
}
