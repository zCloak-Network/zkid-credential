// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { DidsContext } from '@credential/react-dids';

interface Props {
  output: string;
  attester: string;
  multiply?: number;
}

function SbtCard({ attester, multiply = 1, output }: Props) {
  const { did } = useContext(DidsContext);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 548,
        height: 768,
        background: 'url(images/sbt-card.webp) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0px 0px 90px 1px #00CEF9',
        borderRadius: '16px',
        zoom: multiply
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '460px',
          width: '100%',
          paddingX: 4,
          fontWeight: 700,
          color: '#23AFED',
          lineHeight: '30px',
          textShadow: '0px 3px 6px rgba(0,0,0,0.3)',
          fontSize: 30,
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        {output}
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: '520px',
          width: '100%',
          paddingX: 4,
          fontWeight: 700,
          color: '#fff',
          lineHeight: '15px',
          fontSize: 15,
          textAlign: 'center',
          wordBreak: 'break-all',
          userSelect: 'none',
          textDecoration: 'underline'
        }}
      >
        {did.id}
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: '660px',
          width: '100%',
          paddingX: 4,
          fontWeight: 700,
          color: '#fff',
          lineHeight: '15px',
          fontSize: 15,
          textAlign: 'center',
          wordBreak: 'break-all',
          userSelect: 'none'
        }}
      >
        {attester}
      </Typography>
    </Box>
  );
}

export default React.memo(SbtCard);
