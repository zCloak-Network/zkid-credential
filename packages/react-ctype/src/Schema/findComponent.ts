// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { CTypeSchema } from '@zcloak/ctype/types';
import type { ComponentMap, CTypeSchemaProps } from '../types';

import Array from './Array';
import Bool from './Bool';
import Enum from './Enum';
import Integer from './Integer';
import Null from './Null';
import Number from './Number';
import Object from './Object';
import String from './String';

const componentMap: ComponentMap<any> = {
  object: Object,
  string: String,
  number: Number,
  integer: Integer,
  boolean: Bool,
  array: Array,
  null: Null
};

export function findComponent(schema: CTypeSchema): React.ComponentType<CTypeSchemaProps> {
  if (schema.enum) {
    return Enum as any;
  }

  return componentMap[schema.type || 'string'];
}
