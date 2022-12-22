// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CredentialSubject, NativeType, NativeTypeWithOutNull } from '@zcloak/vc/types';

import { alpha, Box, Stack, Typography } from '@mui/material';
import { isHex } from '@polkadot/util';
import React, { useMemo } from 'react';

export const ClaimItem: React.FC<{
  label: string;
  value: React.ReactElement | NativeType | NativeTypeWithOutNull[];
}> = ({ label, value }) => {
  const el = useMemo(() => {
    if (value && React.isValidElement(value)) {
      return value;
    }

    const type = typeof value;

    if (['string', 'number', 'undefined'].includes(type)) {
      return <>{value}</>;
    } else if (typeof value === 'boolean') {
      return (
        <Box
          sx={({ palette }) => ({
            background: alpha(value ? palette.success.main : palette.error.main, 0.2),
            color: value ? palette.success.main : palette.error.main,
            borderRadius: 1,
            width: 92,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          })}
        >
          {value ? 'True' : 'False'}
        </Box>
      );
    } else {
      return <>{JSON.stringify(value)}</>;
    }
  }, [value]);

  return (
    <Stack
      alignItems="baseline"
      direction="row"
      justifyContent="space-between"
      paddingX={3}
      spacing={3}
    >
      <Typography sx={({ palette }) => ({ flex: '0 0 30%', color: palette.grey[700] })}>
        {label}
      </Typography>
      <Box>{el}</Box>
    </Stack>
  );
};

function ClaimDisplay({ contents }: { contents: CredentialSubject }) {
  return !isHex(contents) ? (
    <Stack spacing={2}>
      {Object.entries(contents).map(([key, value]) => (
        <ClaimItem key={key} label={key} value={value} />
      ))}
    </Stack>
  ) : (
    <>{contents}</>
  );
}

export default React.memo(ClaimDisplay);
