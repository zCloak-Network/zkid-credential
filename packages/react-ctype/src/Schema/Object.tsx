// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { InputString } from '@credential/react-components';

import CTypeSchema from './Base';

export function isObject<T>(value: unknown): value is T {
  return !!value && typeof value === 'object';
}

function SchemaBase({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps) {
  const _defaultValue = useMemo(
    () => (isObject<Record<string, unknown>>(defaultValue) ? defaultValue : {}),
    [defaultValue]
  );

  const [value, setValue] = useState<Record<string, unknown>>(_defaultValue);
  const properties = useMemo(() => Object.entries(schema.properties ?? {}), [schema]);

  const _onChange = useCallback((name: string, value: unknown) => {
    setValue((_value) => {
      return {
        ..._value,
        [name]: value
      };
    });
  }, []);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return (
    <Stack spacing={3}>
      {name && <InputString defaultValue={name} disabled />}
      {properties.map(([_name, _schema]) => (
        <CTypeSchema
          defaultValue={_defaultValue?.[_name]}
          disabled={disabled}
          key={_name}
          name={_name}
          onChange={(value) => _onChange(_name, value)}
          schema={_schema}
        />
      ))}
    </Stack>
  );
}

export default React.memo(SchemaBase);
