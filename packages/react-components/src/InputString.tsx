// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputStringProps } from './types';

import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback } from 'react';

import { withBorderInput } from './utils';

function InputString({
  autoFocus,
  defaultValue,
  disabled,
  error,
  label,
  onChange,
  placeholder,
  withBorder
}: InputStringProps) {
  const _onChange = useCallback(
    (e: any) => {
      const _value: string = e.target.value;

      onChange?.(_value);
    },
    [onChange]
  );

  return (
    <FormControl error={!!error} fullWidth variant="outlined">
      {label && <InputLabel shrink>{label}</InputLabel>}
      <OutlinedInput
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={_onChange}
        placeholder={placeholder}
        sx={(theme) => withBorderInput(theme, withBorder)}
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default React.memo(InputString);
