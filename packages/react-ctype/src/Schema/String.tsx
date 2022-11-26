// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import { InputString } from '@credential/react-components';

function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

function SchemaString({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps) {
  const _defaultValue = useMemo(() => (isString(defaultValue) ? defaultValue : ''), [defaultValue]);
  const [value, setValue] = useState<string | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value ?? '');
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? '';

    if (schema.maxLength && _value.length > schema.maxLength) {
      setError(new Error(`The maximum length of value is ${schema.maxLength}`));
    } else if (schema.minLength && _value.length < schema.minLength) {
      setError(new Error(`The minimum length of value is ${schema.minLength}`));
    } else if (schema.pattern) {
      const regexp = new RegExp(schema.pattern);

      if (!regexp.test(_value)) {
        setError(new Error(`Did not match the parttern "${schema.pattern}"`));
      }
    }
  }, [schema, value]);

  return (
    <InputString
      defaultValue={_defaultValue}
      disabled={disabled}
      error={error}
      label={name}
      onChange={setValue}
    />
  );
}

export default React.memo(SchemaString);
