// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import {
  Box,
  Stack,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';

export const TaskCard = React.memo(function TaskCard({
  children,
  operate
}: {
  children: React.ReactNode;
  operate: React.ReactNode;
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  if (upMd) {
    return (
      <TableRow hover>
        {children}
        <TaskCardItem content={operate} label="Operate" />
      </TableRow>
    );
  }

  return (
    <Box
      className="TaskCard"
      sx={({ palette, typography }) => ({
        padding: 2.5,
        border: '1px solid',
        borderColor: palette.grey[200],
        boxShadow: '0px 6px 20px rgba(153,155,168,0.1)',
        borderRadius: '5px',
        fontSize: typography.fontSize
      })}
    >
      <Stack spacing={3}>
        {children}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            '> *': {
              flex: 1
            }
          }}
        >
          {operate}
        </Stack>
      </Stack>
    </Box>
  );
});

export const TaskCardItem = React.memo(function TaskCardItem({
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
          className="TaskCard_Item_content"
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
      className="TaskCard_Item"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        className="TaskCard_Item_label"
        sx={({ palette }) => ({
          color: palette.grey[500]
        })}
      >
        {label}
      </Box>
      <Box
        className="TaskCard_Item_content"
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
