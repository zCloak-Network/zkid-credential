// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, BoxProps, Container, Paper } from '@mui/material';
import React from 'react';

const FullScreenDialogContent: React.FC<React.PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box
      component={Paper}
      flex="1"
      overflow={{
        overflowY: 'scroll'
      }}
      position="relative"
      py={4}
      {...props}
    >
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};

export default React.memo<typeof FullScreenDialogContent>(FullScreenDialogContent);
