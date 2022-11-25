// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputPasswordProps } from './types';

import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  lighten,
  OutlinedInput
} from '@mui/material';
import React, { useCallback } from 'react';

import { useToggle } from '@credential/react-hooks';

const InputPassword: React.FC<InputPasswordProps> = ({
  autoFocus,
  defaultValue,
  error,
  label,
  onChange,
  placeholder,
  withBorder
}) => {
  const [showPassword, toggle] = useToggle(false);

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
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={toggle}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={_onChange}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <LockIcon color="primary" />
          </InputAdornment>
        }
        sx={({ palette }) =>
          withBorder
            ? {}
            : {
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                border: 'none',
                background: lighten(palette.primary.main, 0.94)
              }
        }
        type={showPassword ? 'text' : 'password'}
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default React.memo(InputPassword);
