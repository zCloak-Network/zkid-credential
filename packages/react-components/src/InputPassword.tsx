// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import React from 'react';

import { useToggle } from '@credential/react-hooks';

const InputPassword: React.FC<OutlinedInputProps> = (props) => {
  const [showPassword, toggle] = useToggle(false);

  return (
    <OutlinedInput
      {...props}
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end" onClick={toggle}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      type={showPassword ? 'text' : 'password'}
    />
  );
};

export default React.memo(InputPassword);
