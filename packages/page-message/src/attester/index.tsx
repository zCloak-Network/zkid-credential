// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { useContext } from 'react';

import { DidsContext } from '@credential/react-dids';
import { useMessages } from '@credential/react-hooks';

import Messages from './Messages';

const AttesterMessage: React.FC = () => {
  const { did } = useContext(DidsContext);
  const messages = useMessages('received', did?.id);

  return (
    <Stack spacing={3}>
      <Tabs
        sx={{
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
        value={0}
      >
        <Tab label="Message" />
      </Tabs>
      <Box px={4}>
        <Messages messages={messages} />
      </Box>
    </Stack>
  );
};

export default AttesterMessage;
