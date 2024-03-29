// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import { InputNumber } from '@credential/react-components';

import { isOrDefault } from './utils';

function SchemaNumber({ defaultValue, disabled, error: errorProps, name, onChange, schema }: CTypeSchemaProps<number>) {
  const _defaultValue = useMemo(() => isOrDefault('number', defaultValue) as number, [defaultValue]);
  const [value, setValue] = useState<number | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value ?? 0);
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? 0;

    if (schema.maximum && _value > schema.maximum) {
      setError(new Error(`The maximum of value is ${schema.maximum}`));
    } else if (schema.minimum && _value < schema.minimum) {
      setError(new Error(`The minimum of value is ${schema.minimum}`));
    } else if (schema.exclusiveMaximum && _value >= schema.exclusiveMaximum) {
      setError(new Error(`The exclusive maximum of value is ${schema.exclusiveMaximum}`));
    } else if (schema.exclusiveMinimum && _value <= schema.exclusiveMinimum) {
      setError(new Error(`The exclusive maximum of value is ${schema.exclusiveMinimum}`));
    } else if (schema.multipleOf && _value % schema.multipleOf !== 0) {
      setError(new Error(`The value should be a multiple of ${schema.multipleOf}`));
    } else {
      setError(null);
    }
  }, [schema, value]);

  return (
    <InputNumber
      defaultValue={_defaultValue}
      disabled={disabled}
      error={error || errorProps}
      label={name}
      onChange={setValue}
    />
  );
}

export default React.memo(SchemaNumber);
