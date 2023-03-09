// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseInputProps } from './types';

import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useCallback } from 'react';

import { withBorderInput } from './utils';

function Input({
  autoFocus,
  defaultValue,
  disabled,
  endAdornment,
  error,
  fullWidth = true,
  label,
  multiline,
  onChange,
  placeholder,
  rows,
  size,
  startAdornment,
  type,
  withBorder
}: BaseInputProps<string>) {
  const _onChange = useCallback(
    (e: any) => {
      const _value: string = e.target.value;

      onChange?.(_value);
    },
    [onChange]
  );

  return (
    <FormControl error={!!error} fullWidth={fullWidth} size={size} variant='outlined'>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <OutlinedInput
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={disabled}
        endAdornment={endAdornment && <InputAdornment position='end'>{endAdornment}</InputAdornment>}
        multiline={multiline}
        onChange={_onChange}
        placeholder={placeholder}
        rows={rows}
        startAdornment={startAdornment && <InputAdornment position='start'>{startAdornment}</InputAdornment>}
        sx={(theme) => withBorderInput(theme, withBorder)}
        type={type}
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default Input;
