// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemProps } from './types';

import { FormControl, InputLabel, Switch } from '@mui/material';
import React, { useEffect } from 'react';

const CTypeBool: React.FC<ItemProps> = ({ defaultValue, disabled = false, name, onChange }) => {
  useEffect(() => {
    onChange?.(name, false);
  }, [name, onChange]);

  return (
    <FormControl fullWidth>
      <InputLabel shrink>{name}</InputLabel>
      <Switch
        defaultChecked={(defaultValue || false) as boolean}
        disabled={disabled}
        onChange={(e) => onChange?.(name, e.target.checked)}
      />
    </FormControl>
  );
};

export default React.memo(CTypeBool);
