// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps, CTypeSchemaVectorFixedProps } from '../types';

import { alpha, FormControl, InputLabel, Stack } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

function SchemaVectorFixed({
  defaultValue,
  disabled,
  items,
  name,
  onChange
}: CTypeSchemaVectorFixedProps) {
  const _defaultValue = useMemo(
    () => isOrDefault('array', defaultValue, { length: items.length }) as unknown[],
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
        {items.map((item, index) => (
          <Item
            defaultValue={_defaultValue?.[index]}
            disabled={disabled}
            index={index}
            key={index}
            name={`${name}#${index}`}
            onChangeWithIndex={_onChange}
            schema={item}
          />
        ))}
      </Stack>
    </FormControl>
  );
}

export default React.memo(SchemaVectorFixed);
