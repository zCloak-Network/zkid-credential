// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React from 'react';

import RequestTable from './RequestTable';

const Tasks: React.FC = () => {
  return (
    <Stack spacing={3}>
      <Tabs
        sx={{
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
        value={0}
      >
        <Tab label="Tasks" />
      </Tabs>
      <Box px={{ md: 4, xs: 2 }}>
        <RequestTable />
      </Box>
    </Stack>
  );
};

export default Tasks;
