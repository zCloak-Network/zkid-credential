// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  output: string;
  attester: string;
  multiply?: number;
}

function SbtCard({ attester, multiply = 1, output }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 274 * multiply,
        height: 384 * multiply,
        background: 'url(images/sbt-card.webp) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          bottom: `${120 * multiply}px`,
          width: '100%',
          paddingX: 4 * multiply,
          fontWeight: 700,
          color: '#23AFED',
          lineHeight: `${28 * multiply}px`,
          textShadow: '0px 3px 6px rgba(0,0,0,0.3)',
          fontSize: 28 * multiply,
          textAlign: 'center'
        }}
      >
        {output}
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          bottom: `${38 * multiply}px`,
          width: '100%',
          paddingX: 4 * multiply,
          fontWeight: 700,
          color: '#fff',
          lineHeight: `${13 * multiply}px`,
          fontSize: 13 * multiply,
          textAlign: 'center',
          wordBreak: 'break-all'
        }}
      >
        {attester}
      </Typography>
    </Box>
  );
}

export default React.memo(SbtCard);
