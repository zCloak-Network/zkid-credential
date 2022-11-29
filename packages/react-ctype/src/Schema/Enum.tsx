// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import { Autocomplete, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

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
}: CTypeSchemaProps<string | number | Array<string | number>>) {
  const multiple = useMemo(() => (schema.type === 'array' ? true : undefined), [schema.type]);
  const _defaultValue = useMemo(() => (isString(defaultValue) ? defaultValue : ''), [defaultValue]);
  const [value, setValue] = useState<string | number | Array<string | number> | null>(
    _defaultValue
  );

  useEffect(() => {
    onChange?.(value ?? undefined);
  }, [onChange, value]);

  return (
    <Autocomplete<string | number, boolean>
      defaultValue={defaultValue as any}
      disabled={disabled}
      getOptionLabel={(option) => String(option)}
      multiple={multiple}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      options={schema.enum ?? []}
      renderInput={(params) => {
        return (
          <FormControl fullWidth={params.fullWidth}>
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
          </FormControl>
        );
      }}
    />
  );
}

export default React.memo(SchemaEnum);
