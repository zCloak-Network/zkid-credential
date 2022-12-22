// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Paper } from '@mui/material';
import React from 'react';

interface Props {
  bg?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const FullScreenDialogContent: React.FC<Props> = ({ bg, children, maxWidth }) => {
  return (
    <Box
      component={Paper}
      flex="1"
      maxHeight="80vh"
      overflow={{
        overflowY: 'scroll'
      }}
      position="relative"
      py={4}
      sx={
        bg
          ? {
              background: `url(${bg}) no-repeat, #fff`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : {}
      }
    >
      <Container maxWidth={maxWidth ?? 'sm'}>{children}</Container>
    </Box>
  );
};

export default React.memo<typeof FullScreenDialogContent>(FullScreenDialogContent);
