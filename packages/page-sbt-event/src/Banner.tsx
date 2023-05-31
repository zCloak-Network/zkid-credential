// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Typography } from '@mui/material';
import React from 'react';

export const Banner: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const isClick = Boolean(onClick);

  return (
    <Box
      onClick={onClick}
      pt={isClick ? 1 : 3}
      sx={{
        width: '100%',
        height: isClick ? 200 : 400,
        background: 'url(/images/png_fingerprint.webp) no-repeat, url(/images/bac_banner.webp) no-repeat',
        backgroundPosition: 'center 70%',
        backgroundSize: 'contain,cover',
        ':hover': {
          cursor: isClick ? 'pointer' : 'unset'
        }
      }}
    >
      <Typography
        fontWeight={800}
        sx={{
          color: '#0042F1',
          fontSize: isClick ? '30px' : '54px',
          span: {
            color: '#fff'
          }
        }}
        textAlign='center'
      >
        zkKYC <span>Event</span>
      </Typography>
      <Typography
        color='#fff'
        mt={isClick ? 12 : 30}
        sx={{
          span: {
            fontWeight: 600
          }
        }}
        textAlign='center'
      >
        Supported by <span>Chaintool, zCloak Network</span>
      </Typography>
    </Box>
  );
};

export default React.memo(Banner);
