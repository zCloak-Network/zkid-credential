// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import React, { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  InputBool,
  InputNumber,
  Stack,
  Typography
} from '@credential/react-components';

import ItemCreation from './ItemCreation';

interface Props {
  onChange: (value: CTypeSchema) => void;
}

function StringRestrictions({ onChange }: Props) {
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [unique, setUnique] = useState<boolean>();
  const [items, setItems] = useState<CTypeSchema>();

  useEffect(() => {
    const schema: CTypeSchema = {};

    if (min !== undefined) {
      schema.minItems = min;
    }

    if (max !== undefined) {
      schema.maxItems = max;
    }

    if (unique !== undefined) {
      schema.uniqueItems = unique;
    }

    if (items !== undefined) {
      schema.items = items;
    }

    onChange(schema);
  }, [items, max, min, onChange, unique]);

  return (
    <Stack spacing={1}>
      <Box>
        <InputNumber onChange={setMin} size="small" startAdornment="minimum items" />
        <InputNumber onChange={setMax} size="small" startAdornment="maximum items" />
      </Box>
      <Box>
        <InputBool label="Unique" onChange={setUnique} size="small" />
      </Box>
      <Box>
        <Typography>Item types</Typography>
        <Box
          sx={({ palette }) => ({
            padding: 1,
            borderRadius: 1,
            background: alpha(palette.info.main, 0.05)
          })}
        >
          <ItemCreation
            onChange={setItems}
            supported={['integer', 'number', 'string']}
            withName={false}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default React.memo(StringRestrictions);
