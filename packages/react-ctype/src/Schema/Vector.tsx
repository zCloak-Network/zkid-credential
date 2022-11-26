// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaVectorProps } from '../types';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { alpha, Button, Stack } from '@mui/material';
import { isArray } from '@polkadot/util';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import SchemaBase from './Base';

function isVector(value: unknown): value is Array<unknown> {
  return isArray(value);
}

function SchemaVector({ defaultValue, disabled, items, name, onChange }: CTypeSchemaVectorProps) {
  const _defaultValue = useMemo(
    () => (isVector(defaultValue) ? defaultValue : Array.from({ length: 1 })),
    [defaultValue]
  );
  const [values, setValues] = useState<unknown[]>(_defaultValue);
  const [count, setCount] = useState(() => values.length);

  const _onChange = useCallback((index: number, value: unknown) => {
    setValues((_value) => {
      if (!_value) _value = Array.from({ length: index + 1 });

      _value[index] = value;

      return [..._value];
    });
  }, []);

  useEffect((): void => {
    setValues((values) => {
      if (values.length === count) {
        return values;
      }

      return values.slice(0, count);
    });
  }, [count]);

  useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  const _rowAdd = useCallback((): void => setCount((count) => count + 1), []);
  const _rowRemove = useCallback((): void => setCount((count) => count - 1), []);

  return (
    <Stack
      spacing={1}
      sx={({ palette }) => ({
        borderLeft: '8px',
        borderLeftColor: palette.primary.main,
        background: alpha(palette.primary.main, 0.1)
      })}
    >
      {!disabled && (
        <Stack direction="row" spacing={2}>
          <Button onClick={_rowAdd} startIcon={<AddCircleOutlineIcon />} variant="outlined">
            Add item
          </Button>
          <Button
            disabled={values.length === 0}
            onClick={_rowRemove}
            startIcon={<RemoveCircleOutlineIcon />}
            variant="contained"
          >
            Remove item
          </Button>
        </Stack>
      )}
      {values.map((_, index) => (
        <SchemaBase
          defaultValue={_defaultValue?.[index]}
          disabled={disabled}
          key={index}
          name={`${name}#${index}`}
          onChange={(value) => _onChange(index, value)}
          schema={items}
        />
      ))}
    </Stack>
  );
}

export default React.memo(SchemaVector);
