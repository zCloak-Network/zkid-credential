// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { CTypeSchema } from '@zcloak/ctype/types';
import type { ComponentMap, CTypeSchemaProps } from '../types';

import Bool from './Bool';
import Integer from './Integer';
import Null from './Null';
import Number from './Number';
import Object from './Object';
import String from './String';

const componentMap: ComponentMap = {
  object: Object,
  string: String,
  number: Number,
  integer: Integer,
  boolean: Bool,
  array: String,
  null: Null
};

export function findComponent(schema: CTypeSchema): React.ComponentType<CTypeSchemaProps> {
  return componentMap[schema.type || 'string'];
}
