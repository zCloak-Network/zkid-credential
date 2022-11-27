// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import { isInteger, isOrDefault } from './utils';
import { SchemaNumber } from '.';

function SchemaInteger({
  defaultValue,
  disabled,
  name,
  onChange,
  schema
}: CTypeSchemaProps<number>) {
  const _defaultValue = useMemo(
    () => isOrDefault('integer', defaultValue) as number,
    [defaultValue]
  );
  const [value, setValue] = useState<number | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? 0;

    if (!isInteger(_value)) {
      setError(new Error('The value should be an integer'));
    } else {
      setError(null);
    }
  }, [value]);

  return (
    <SchemaNumber
      defaultValue={_defaultValue}
      disabled={disabled}
      error={error}
      name={name}
      onChange={setValue}
      schema={schema}
    />
  );
}

export default React.memo(SchemaInteger);
