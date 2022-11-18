// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { alpha, Box, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

const Mnemonic: React.FC<{ mnemonic: string }> = ({ mnemonic }) => {
  const items = useMemo(() => mnemonic.split(' '), [mnemonic]);

  return (
    <Box
      borderRadius={2.5}
      sx={({ palette }) => ({ background: alpha(palette.primary.main, 0.12) })}
    >
      <Grid
        columnSpacing={{
          xs: 3,
          md: 8
        }}
        container
        padding={3.5}
        rowSpacing={{
          xs: 2,
          md: 3
        }}
      >
        {items.map((item, index) => (
          <Grid alignItems="center" component={Stack} item key={index} md={4} width={120} xs={6}>
            <Typography sx={{ userSelect: 'none' }} width={44}>
              {index + 1}.
            </Typography>
            <Box
              alignItems="center"
              bgcolor="white"
              borderRadius={2}
              display="flex"
              height={32}
              justifyContent="center"
              width={100}
            >
              {item}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(Mnemonic);
