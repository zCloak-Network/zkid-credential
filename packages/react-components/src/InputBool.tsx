// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputBoolProps } from './types';

import { FormControl, FormHelperText, InputLabel, Switch } from '@mui/material';
import React, { useCallback } from 'react';

function InputBool({ defaultValue, disabled, error, label, onChange, size }: InputBoolProps) {
  const _onChange = useCallback(
    (e: any) => {
      const _value: boolean = e.target.checked;

      onChange?.(_value);
    },
    [onChange]
  );

  return (
    <FormControl error={!!error} fullWidth size={size} variant="outlined">
      {label && <InputLabel shrink>{label}</InputLabel>}
      <Switch defaultChecked={defaultValue || false} disabled={disabled} onChange={_onChange} />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default React.memo(InputBool);
