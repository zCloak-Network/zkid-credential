// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React from 'react';

import ImportCType from '@credential/page-ctype/ImportCType';

import CTypeList from './CTypeList';
import { useIssueCTypes } from './useIssueCTypes';

const Issue: React.FC = () => {
  const ctypes = useIssueCTypes();

  return (
    <Stack spacing={3}>
      <Tabs
        sx={{
          position: 'relative',
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
        value={0}
      >
        <Tab label="Issue" />
        <Box sx={{ position: 'absolute', right: 0, textAlign: 'right', mr: 3 }}>
          <ImportCType />
        </Box>
      </Tabs>
      <Box px={{ md: 4, xs: 2 }}>
        <CTypeList list={ctypes} />
      </Box>
    </Stack>
  );
};

export default Issue;
