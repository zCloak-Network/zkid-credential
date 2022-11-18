// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';
import type { InstanceType } from '@zcloak/ctype/types';
import type { NativeType } from '@zcloak/vc/types';

export interface ItemProps {
  name: string;
  disabled?: boolean;
  type?: InstanceType;
  defaultValue?: unknown;
  onError?: (key: string, error: Error | null) => void;
  onChange?: (key: string, value: NativeType) => void;
}

export type ItemMap = Record<InstanceType, React.FC<ItemProps>>;
