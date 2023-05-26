// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { CredentialSubject, NativeType, NativeTypeWithOutNull } from '@zcloak/vc/types';

import { alpha, Box, Stack, Typography } from '@mui/material';
import { isHex } from '@polkadot/util';
import React, { useMemo } from 'react';

import { national } from '@credential/app-config';
import { getCacheCType } from '@credential/app-store';
import { DidName } from '@credential/react-dids';
import { useLiveQuery } from '@credential/react-hooks';

export const ClaimItem: React.FC<{
  label: string;
  value: React.ReactElement | NativeType | NativeTypeWithOutNull[];
  format?: string; // 'date' | 'time' | 'date-time' | 'url' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'int32' | 'int64' | 'uint32' | 'uint64' | 'float' | 'double' | 'bytes' | 'hex' | 'did' | 'timestamp' | 'national-code'
}> = ({ format, label, value }) => {
  const el = useMemo(() => {
    if (value && React.isValidElement(value)) {
      return value;
    }

    const type = typeof value;

    if (['string', 'number', 'undefined'].includes(type)) {
      if (format === 'timestamp') {
        return <>{new Date(Number(value)).toLocaleString()}</>;
      } else if (format === 'did') {
        return <DidName value={value as string} />;
      } else if (format === 'national-code') {
        const finded = national.find((item) => item.place === value);

        return <>{finded ? finded.country : JSON.stringify(value)}</>;
      }

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
  }, [format, value]);

  return (
    <Stack alignItems='baseline' direction='row' justifyContent='space-between' paddingX={3} spacing={3}>
      <Typography sx={({ palette }) => ({ flex: '0 0 30%', color: palette.grey[700] })}>{label}</Typography>
      <Box>{el}</Box>
    </Stack>
  );
};

function ClaimDisplay({ contents, ctype }: { ctype: HexString; contents: CredentialSubject }) {
  const local = useLiveQuery(getCacheCType, [ctype]);

  return !isHex(contents) ? (
    <Stack spacing={2}>
      {Object.entries(contents).map(([key, value]) => (
        <ClaimItem format={local?.properties?.[key].format} key={key} label={key} value={value} />
      ))}
    </Stack>
  ) : (
    <>{contents}</>
  );
}

export default React.memo(ClaimDisplay);
