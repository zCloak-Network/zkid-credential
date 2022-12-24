// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message, MessageType } from '@zcloak/message/types';

import React from 'react';

import {
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme
} from '@credential/react-components';

import MessageRow from '../messages/MessageRow';

function Messages({ messages }: { messages?: Message<MessageType>[] }) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  if (upMd) {
    return (
      <TableContainer>
        <Table
          sx={({ spacing }) => ({
            borderCollapse: 'separate',

            borderSpacing: `0px ${spacing(2)}`,
            '.MuiTableCell-root': {
              '&:nth-of-type(1)': {
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px'
              },
              '&:nth-last-of-type(1)': {
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px'
              }
            }
          })}
        >
          <TableHead>
            <TableRow
              sx={({ palette }) => ({
                border: 'none',
                background: alpha(palette.primary.main, 0.1)
              })}
            >
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Message id</TableCell>
              <TableCell>Credential type</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={({ palette }) => ({
              'MuiTableRow-hover:hover': {
                backgroundColor: palette.common.white
              },
              '.MuiTableRow-root': {
                border: 'none',
                background: palette.background.paper,
                ':hover': {
                  border: '1px solid',
                  borderColor: palette.grey[200],
                  boxShadow: '0px 6px 20px rgba(153, 155, 168, 0.1)',
                  background: palette.common.white
                },

                '.MuiTableCell-root': {
                  height: 76
                }
              }
            })}
          >
            {messages?.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Grid columns={{ xs: 8 }} container spacing={3}>
      {messages?.map((message) => (
        <Grid key={message.id} sm={4} xs={8}>
          <MessageRow message={message} />
        </Grid>
      ))}
    </Grid>
  );
}

export default React.memo(Messages);
