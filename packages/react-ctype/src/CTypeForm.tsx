// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { NativeType } from '@zcloak/vc/types';

import { Box, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { InputDid } from '@credential/react-dids';

import CTypeItem from './CTypeItem';

const CTypeForm: React.FC<
  React.PropsWithChildren<{
    cType: CType;
    disabled?: boolean;
    defaultData?: Record<string, NativeType>;
    onChange?: (data: Record<string, NativeType>) => void;
    onError?: (error: Record<string, Error | null | undefined>) => void;
    defaultAttester?: string;
    handleAttester?: (value: Did | null) => void;
  }>
> = ({
  cType,
  onChange,
  onError,
  handleAttester,
  disabled = false,
  defaultAttester,
  defaultData = {},
  children
}) => {
  const [data, setData] = useState<Record<string, NativeType>>(defaultData);
  const [error, setError] = useState<Record<string, Error | null | undefined>>({});

  const _onChange = useCallback((key: string, value: NativeType) => {
    setData((data) => ({
      ...data,
      [key]: value
    }));
  }, []);

  const _onError = useCallback((key: string, value: Error | null) => {
    setError((error) => ({
      ...error,
      [key]: value
    }));
  }, []);

  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);

  useEffect(() => {
    onError?.(error);
  }, [error, onError]);

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel shrink>Credential type</InputLabel>
        <OutlinedInput disabled value={cType.title} />
      </FormControl>
      <InputDid
        defaultValue={defaultAttester}
        disabled={disabled}
        label="Attester"
        onChange={handleAttester}
      />
      <Box />
      {Object.keys(cType.properties).map((key) => (
        <CTypeItem
          defaultValue={defaultData?.[key]}
          disabled={disabled}
          key={key}
          name={key}
          onChange={_onChange}
          onError={_onError}
          type={cType.properties[key].type}
        />
      ))}
      {children}
    </Stack>
  );
};

export default React.memo(CTypeForm);
