// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import React, { useEffect, useState } from 'react';

import { Box, InputNumber, Stack } from '@credential/react-components';

interface Props {
  onChange: (value: CTypeSchema) => void;
}

function NumberRestrictions({ onChange }: Props) {
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  useEffect(() => {
    const schema: CTypeSchema = {};

    if (min !== undefined) {
      schema.minimum = min;
    }

    if (max !== undefined) {
      schema.maximum = max;
    }

    onChange(schema);
  }, [max, min, onChange]);

  return (
    <Stack spacing={1}>
      <Box>
        <InputNumber fullWidth onChange={setMin} size="small" startAdornment="minimum" />
        <InputNumber fullWidth onChange={setMax} size="small" startAdornment="maximum" />
      </Box>
    </Stack>
  );
}

export default React.memo(NumberRestrictions);
