// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export interface BaseInputProps<T> {
  defaultValue?: T;
  onChange?: (value: T) => void;
  label?: React.ReactNode;
  error?: Error | null;
  autoFocus?: boolean;
  placeholder?: string;
  withBorder?: boolean;
}

export type InputPasswordProps = BaseInputProps<string>;
