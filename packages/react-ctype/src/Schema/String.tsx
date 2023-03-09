// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import { InputString } from '@credential/react-components';

import { isOrDefault } from './utils';

function SchemaString({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps<string>) {
  const _defaultValue = useMemo(() => isOrDefault('string', defaultValue) as string, [defaultValue]);
  const [value, setValue] = useState<string | undefined>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(value ?? '');
  }, [onChange, value]);

  useEffect(() => {
    const _value = value ?? '';

    if (schema.required === true && !_value) {
      setError(new Error('Required item, please input'));
    } else if (schema.maxLength && _value.length > schema.maxLength) {
      setError(new Error(`The maximum length of value is ${schema.maxLength}`));
    } else if (schema.minLength && _value.length < schema.minLength) {
      setError(new Error(`The minimum length of value is ${schema.minLength}`));
    } else if (schema.pattern && !new RegExp(schema.pattern).test(_value)) {
      setError(new Error(`Did not match the parttern "${schema.pattern}"`));
    } else {
      setError(null);
    }
  }, [schema, value]);

  return (
    <InputString defaultValue={_defaultValue} disabled={disabled} error={error} label={name} onChange={setValue} />
  );
}

export default React.memo(SchemaString);
