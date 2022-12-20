// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputPasswordProps } from './types';

import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';

import { useToggle } from '@credential/react-hooks';

import Input from './Input';

function InputPassword({ endAdornment, onChange, startAdornment }: InputPasswordProps) {
  const [showPassword, toggle] = useToggle(false);

  return (
    <Input
      autoFocus
      endAdornment={
        endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={toggle}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }
      onChange={onChange}
      startAdornment={
        startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : (
          <InputAdornment position="start">
            <LockIcon color="primary" />
          </InputAdornment>
        )
      }
      type={showPassword ? 'text' : 'password'}
    />
  );
}

export default React.memo(InputPassword);
