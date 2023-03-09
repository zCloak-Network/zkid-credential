// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import React, { useEffect, useState } from 'react';

import { Box, InputNumber, InputString, Stack } from '@credential/react-components';

interface Props {
  onChange: (value: CTypeSchema) => void;
}

function StringRestrictions({ onChange }: Props) {
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [pattern, setPattern] = useState<string>();

  useEffect(() => {
    const schema: CTypeSchema = {};

    if (min !== undefined) {
      schema.minLength = min;
    }

    if (max !== undefined) {
      schema.maxLength = max;
    }

    if (pattern) {
      schema.pattern = pattern;
    }

    onChange(schema);
  }, [max, min, onChange, pattern]);

  return (
    <Stack spacing={1}>
      <Box>
        <InputNumber fullWidth onChange={setMin} size='small' startAdornment='minimum length' />
        <InputNumber fullWidth onChange={setMax} size='small' startAdornment='maximum length' />
      </Box>
      <Box>
        <InputString
          fullWidth
          onChange={setPattern}
          placeholder='E.g: ^[0-9A-Za-z]{10}$'
          size='small'
          startAdornment='Pattern'
        />
      </Box>
    </Stack>
  );
}

export default React.memo(StringRestrictions);
