// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export interface BaseInputProps<T> {
  defaultValue?: T;
  disabled?: boolean;
  onChange?: (value: T) => void;
  label?: React.ReactNode;
  error?: Error | null;
  autoFocus?: boolean;
  placeholder?: string;
  withBorder?: boolean;
  type?: string;
  fullWidth?: boolean;
  size?: 'medium' | 'small';
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export type InputPasswordProps = BaseInputProps<string>;
export type InputStringProps = BaseInputProps<string>;
export type InputBoolProps = BaseInputProps<boolean>;
export type InputNumberProps = BaseInputProps<number>;
