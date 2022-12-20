// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputNumberProps } from './types';

import React from 'react';

import Input from './Input';

function InputNumber({ defaultValue, onChange, ...props }: InputNumberProps) {
  return (
    <Input
      defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
      onChange={(value) => onChange?.(Number(value) ?? 0)}
      type="number"
      {...props}
    />
  );
}

export default React.memo(InputNumber);
