// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputNumberProps } from './types';

import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback } from 'react';

import { withBorderInput } from './utils';

function InputNumber({
  autoFocus,
  defaultValue,
  disabled,
  error,
  label,
  onChange,
  placeholder,
  withBorder
}: InputNumberProps) {
  const _onChange = useCallback(
    (e: any) => {
      const _value: string = e.target.value;

      onChange?.(Number(_value));
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
        type="number"
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default React.memo(InputNumber);
