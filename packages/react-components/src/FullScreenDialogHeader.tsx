// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

function FullScreenDialogHeader({
  desc,
  icon,
  onClose,
  title
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: React.ReactNode;
  onClose?: () => void;
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={({ palette }) => ({
        paddingX: downMd ? 2 : 0,
        paddingTop: downMd ? 4.5 : 0,
        paddingBottom: downMd ? 3 : 0,
        color: downMd ? palette.common.black : palette.common.white,
        marginBottom: 4,
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: downMd ? palette.grey[200] : 'transparent'
      })}
    >
      <Stack alignItems='center' direction='row' spacing={3}>
        <span>{icon}</span>
        <Box>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='inherit'>{desc}</Typography>
        </Box>
      </Stack>
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            color: 'inherit',
            position: 'fixed',
            right: '20px',
            top: '20px'
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default React.memo<typeof FullScreenDialogHeader>(FullScreenDialogHeader);
