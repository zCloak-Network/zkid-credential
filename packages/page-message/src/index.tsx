// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react';

import { Box, Stack, Tab, Tabs, Typography } from '@credential/react-components';
import { useMessages } from '@credential/react-hooks';

import MessagesTable from './claimer/Messages';

function Messages() {
  const [type, setType] = useState(0);

  const messages = useMessages(type === 0 ? 'all' : type === 1 ? 'received' : 'sent');

  return (
    <>
      <Stack spacing={4}>
        <Typography variant="h2">Messages</Typography>
        <Tabs onChange={(_, value) => setType(value)} value={type}>
          <Tab label="All" />
          <Tab label="Received" />
          <Tab label="Sent" />
        </Tabs>
        <Box>
          <MessagesTable messages={messages} />
        </Box>
      </Stack>
    </>
  );
}

export default Messages;
