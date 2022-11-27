// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { CTypeSchema, InstanceType } from '@zcloak/ctype/types';

export interface CTypeSchemaProps<T = unknown> {
  schema: CTypeSchema;
  name?: string;
  disabled?: boolean;
  error?: Error | null;
  defaultValue?: T;
  onChange?: (value?: T) => void;
}

export interface CTypeSchemaVectorFixedProps extends CTypeSchemaProps<unknown[]> {
  items: CTypeSchema[];
}

export interface CTypeSchemaVectorProps extends CTypeSchemaProps<unknown[]> {
  items: CTypeSchema;
}

export type ComponentMap<T> = Record<InstanceType, React.ComponentType<CTypeSchemaProps<T>>>;
