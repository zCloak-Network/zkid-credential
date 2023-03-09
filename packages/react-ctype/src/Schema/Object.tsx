// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Stack } from '@credential/react-components';

import CTypeSchema from './Base';
import { isOrDefault } from './utils';

export function isObject<T>(value: unknown): value is T {
  return !!value && typeof value === 'object';
}

function Item({
  defaultValue,
  disabled,
  name,
  onChangeWithName,
  schema
}: CTypeSchemaProps<unknown> & { onChangeWithName: (name: string, value: unknown) => void }) {
  const onChange = useCallback(
    (value: unknown) => {
      name && onChangeWithName(name, value);
    },
    [name, onChangeWithName]
  );

  return (
    <CTypeSchema defaultValue={defaultValue} disabled={disabled} name={name} onChange={onChange} schema={schema} />
  );
}

function SchemaBase({ defaultValue, disabled, onChange, schema }: CTypeSchemaProps<Record<string, unknown>>) {
  const _defaultValue = useMemo(() => isOrDefault('object', defaultValue) as Record<string, unknown>, [defaultValue]);

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
      {properties.map(([_name, _schema]) => (
        <Item
          defaultValue={_defaultValue?.[_name]}
          disabled={disabled}
          key={_name}
          name={_name}
          onChangeWithName={_onChange}
          schema={_schema}
        />
      ))}
    </Stack>
  );
}

export default React.memo(SchemaBase);
