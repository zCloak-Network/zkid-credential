// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@credential/react-components';
import { withBorderInput } from '@credential/react-components/utils';

function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

function SchemaEnum({
  defaultValue,
  disabled,
  name,
  onChange,
  schema
}: CTypeSchemaProps<string | number>) {
  const _defaultValue = useMemo(() => (isString(defaultValue) ? defaultValue : ''), [defaultValue]);
  const [value, setValue] = useState<string | number>(_defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!schema.enum?.includes(value)) {
      setError(new Error('Please select a value'));
    } else {
      setError(null);
    }
  }, [schema.enum, schema.maxItems, schema.minItems, schema.uniqueItems, value]);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  if (!schema.enum) {
    return <Alert severity="error">Not enum property provide]</Alert>;
  }

  return (
    <Autocomplete<string | number, undefined, boolean>
      defaultValue={defaultValue as any}
      disableClearable
      disabled={disabled}
      getOptionLabel={(option) => String(option)}
      onChange={(_, newValue) => {
        if (newValue !== null) setValue(newValue);
      }}
      options={schema.enum ?? []}
      renderInput={(params) => {
        return (
          <FormControl error={!!error} fullWidth={params.fullWidth}>
            {name && (
              <InputLabel {...params.InputLabelProps} shrink>
                {name}
              </InputLabel>
            )}
            <OutlinedInput
              {...params.InputProps}
              disabled={params.disabled}
              inputProps={params.inputProps}
              sx={(theme) => withBorderInput(theme, false)}
            />
            {error ? <FormHelperText>{error.message}</FormHelperText> : null}
          </FormControl>
        );
      }}
    />
  );
}

export default React.memo(SchemaEnum);
