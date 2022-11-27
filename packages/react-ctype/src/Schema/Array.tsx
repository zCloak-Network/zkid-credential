// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import { Alert } from '@mui/material';
import { isArray } from '@polkadot/util';
import React, { useEffect, useMemo, useState } from 'react';

import { isOrDefault } from './utils';
import SchemaVector from './Vector';
import SchemaVectorFixed from './VectorFixed';

function SchemaArray({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps) {
  const _defaultValue = useMemo(
    () => isOrDefault('array', defaultValue) as unknown[],
    [defaultValue]
  );
  const [value, setValue] = useState<unknown[] | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? [];

    if (schema.maxItems && _value.length > schema.maxItems) {
      setError(new Error(`The maximum items of value is ${schema.maxItems}`));
    } else if (schema.minItems && _value.length < schema.minItems) {
      setError(new Error(`The minimum items of value is ${schema.maxItems}`));
    } else if (schema.uniqueItems && new Set(_value).size < _value.length) {
      setError(new Error('Each items value should be unique'));
    } else {
      setError(null);
    }
  }, [schema.maxItems, schema.minItems, schema.uniqueItems, value]);

  return (
    <>
      {isArray(schema.items) ? (
        <SchemaVectorFixed
          defaultValue={_defaultValue}
          disabled={disabled}
          items={schema.items}
          name={name}
          onChange={setValue}
          schema={schema}
        />
      ) : (
        <SchemaVector
          defaultValue={_defaultValue}
          disabled={disabled}
          items={schema.items ?? { type: 'string' }}
          name={name}
          onChange={setValue}
          schema={schema}
        />
      )}
      {error && <Alert severity="error">{error.message}</Alert>}
    </>
  );
}

export default React.memo(SchemaArray);
