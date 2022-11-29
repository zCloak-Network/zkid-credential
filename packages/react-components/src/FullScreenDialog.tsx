// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Modal, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  open: boolean;
}

function FullScreenDialog({ children, open }: Props) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Modal
      open={open}
      sx={{
        width: '100%',

        '.MuiBackdrop-root': {
          background: downMd ? '#fff' : 'rgba(0, 0, 0, 0.9)'
        }
      }}
    >
      {downMd ? (
        <Box
          sx={() => ({
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
          })}
        >
          {children}
        </Box>
      ) : (
        <Container
          maxWidth="xl"
          sx={({ spacing }) => ({
            position: 'absolute',
            bottom: 0,
            top: spacing(4),
            left: 0,
            right: 0,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
          })}
        >
          {children}
        </Container>
      )}
    </Modal>
  );
}

export default React.memo<typeof FullScreenDialog>(FullScreenDialog);
