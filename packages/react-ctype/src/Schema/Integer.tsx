// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import { isNumber } from '@polkadot/util';
import React, { useEffect, useMemo, useState } from 'react';

import { SchemaNumber } from '.';

function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

function SchemaInteger({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps) {
  const _defaultValue = useMemo(() => (isInteger(defaultValue) ? defaultValue : 0), [defaultValue]);
  const [value, setValue] = useState<number | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value ?? '');
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? 0;

    if (!isInteger(_value)) {
      setError(new Error('The value should be an integer'));
    }
  }, [value]);

  return (
    <SchemaNumber
      defaultValue={_defaultValue}
      disabled={disabled}
      error={error}
      name={name}
      onChange={setValue as (value: unknown) => void}
      schema={schema}
    />
  );
}

export default React.memo(SchemaInteger);
