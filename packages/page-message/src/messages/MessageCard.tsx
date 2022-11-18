// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, TableCell, TableRow, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { ellipsisMixin } from '@credential/react-components/utils';

export const MessageCard = React.memo(function MessageCard({
  children,
  onClick
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  if (upMd) {
    return (
      <TableRow hover onClick={onClick}>
        {children}
      </TableRow>
    );
  }

  return (
    <Box
      className="MessageCard"
      onClick={onClick}
      sx={({ palette, typography }) => ({
        padding: 2.5,
        background: palette.common.white,
        boxShadow: '0px 6px 20px rgba(153,155,168,0.1)',
        borderRadius: '20px',
        fontSize: typography.fontSize
      })}
    >
      <Stack spacing={3}>{children}</Stack>
    </Box>
  );
});

export const MessageCardItem = React.memo(function MessageCardItem({
  content,
  label
}: {
  label?: string;
  content?: React.ReactNode;
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  if (upMd) {
    return (
      <TableCell>
        <Box
          className="MessageCard_Item_content"
          sx={({ palette }) => ({
            color: palette.text.primary,
            maxWidth: 160,
            ...ellipsisMixin()
          })}
        >
          {content}
        </Box>
      </TableCell>
    );
  }

  return (
    <Box
      className="MessageCard_Item"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        className="MessageCard_Item_label"
        sx={({ palette }) => ({
          color: palette.grey[500]
        })}
      >
        {label}
      </Box>
      <Box
        className="MessageCard_Item_content"
        sx={({ palette }) => ({
          color: palette.text.primary,
          textAlign: 'right',
          maxWidth: 160,
          ...ellipsisMixin()
        })}
      >
        {content}
      </Box>
    </Box>
  );
});
