// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemProps } from './types';

import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CTypeInput: React.FC<ItemProps> = ({
  defaultValue,
  disabled = false,
  name,
  onChange,
  onError,
  type
}) => {
  const [_value, _setValue] = useState<string>();
  const error = useMemo(() => {
    if (!_value) {
      return new Error('Empty');
    }

    return null;
  }, [_value]);

  const _onChange = useCallback(
    (e: any) => {
      _setValue(e.target.value.trim());
      onChange?.(name, e.target.value.trim());
    },
    [name, onChange]
  );

  useEffect(() => {
    onError?.(name, error);
  }, [error, name, onError]);

  return (
    <FormControl error={!!error} fullWidth>
      <InputLabel shrink>{name}</InputLabel>
      <OutlinedInput
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={_onChange}
        placeholder={`Please input ${type}`}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(CTypeInput);
