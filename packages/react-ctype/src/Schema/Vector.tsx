// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps, CTypeSchemaVectorProps } from '../types';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { alpha, Button, FormControl, InputLabel, Stack } from '@credential/react-components';

import SchemaBase from './Base';
import { isOrDefault } from './utils';

function Item({
  index,
  onChangeWithIndex,
  ...props
}: CTypeSchemaProps & {
  index: number;
  onChangeWithIndex: (index: number, value: unknown) => void;
}) {
  const onChange = useCallback(
    (value: unknown) => {
      onChangeWithIndex(index, value);
    },
    [index, onChangeWithIndex]
  );

  return <SchemaBase {...props} onChange={onChange} />;
}

function SchemaVector({ defaultValue, disabled, items, name, onChange }: CTypeSchemaVectorProps) {
  const _defaultValue = useMemo(() => isOrDefault('array', defaultValue) as unknown[], [defaultValue]);
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

      if (values.length < count) {
        values.push(isOrDefault(items.type ?? 'string', undefined));
      }

      return values.slice(0, count);
    });
  }, [count, items.type]);

  useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  const _rowAdd = useCallback((): void => setCount((count) => count + 1), []);
  const _rowRemove = useCallback((): void => setCount((count) => count - 1), []);

  return (
    <FormControl>
      {name && <InputLabel shrink>{name}</InputLabel>}
      <Stack
        spacing={1}
        sx={({ palette }) => ({
          padding: 2,
          borderLeft: '8px solid',
          borderLeftColor: palette.primary.main,
          background: alpha(palette.primary.main, 0.1)
        })}
      >
        {values.map((_, index) => (
          <Item
            defaultValue={_defaultValue?.[index]}
            disabled={disabled}
            index={index}
            key={index}
            name={`${name}#${index}`}
            onChangeWithIndex={_onChange}
            schema={items}
          />
        ))}
        {!disabled && (
          <Stack direction='row' spacing={2}>
            <Button onClick={_rowAdd} startIcon={<AddCircleOutlineIcon />} variant='outlined'>
              Add item
            </Button>
            <Button
              disabled={values.length === 0}
              onClick={_rowRemove}
              startIcon={<RemoveCircleOutlineIcon />}
              variant='contained'
            >
              Remove item
            </Button>
          </Stack>
        )}
      </Stack>
    </FormControl>
  );
}

export default React.memo(SchemaVector);
