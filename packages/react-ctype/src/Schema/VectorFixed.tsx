// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaVectorFixedProps } from '../types';

import { alpha, Stack } from '@mui/material';
import { isArray } from '@polkadot/util';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import SchemaBase from './Base';

function isVectorFixed(value: unknown, length: number): value is Array<unknown> {
  return isArray(value) && value.length === length;
}

function SchemaVectorFixed({
  defaultValue,
  disabled,
  items,
  name,
  onChange
}: CTypeSchemaVectorFixedProps) {
  const _defaultValue = useMemo(
    () =>
      isVectorFixed(defaultValue, items.length)
        ? defaultValue
        : Array.from({ length: items.length }),
    [defaultValue, items.length]
  );
  const [value, setValue] = useState<unknown[]>(_defaultValue);

  const _onChange = useCallback((index: number, value: unknown) => {
    setValue((_value) => {
      _value[index] = value;

      return [..._value];
    });
  }, []);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return (
    <Stack
      spacing={1}
      sx={({ palette }) => ({
        borderLeft: '8px',
        borderLeftColor: palette.primary.main,
        background: alpha(palette.primary.main, 0.1)
      })}
    >
      {items.map((item, index) => (
        <SchemaBase
          defaultValue={_defaultValue?.[index]}
          disabled={disabled}
          key={index}
          name={`${name}#${index}`}
          onChange={(value) => _onChange(index, value)}
          schema={item}
        />
      ))}
    </Stack>
  );
}

export default React.memo(SchemaVectorFixed);
