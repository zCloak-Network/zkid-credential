// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import ImportCType from '@credential/page-ctype/ImportCType';
import { Box, Stack, Tab, Tabs } from '@credential/react-components';

import CTypeList from './CTypeList';
import { useIssueCTypes } from './useIssueCTypes';

const Issue: React.FC = () => {
  const ctypes = useIssueCTypes();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          position: 'relative',
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
      >
        <Tabs value={0}>
          <Tab label="Issue" />
        </Tabs>
        <Box sx={{ position: 'absolute', right: 0, top: 0, textAlign: 'right', mr: 3 }}>
          <ImportCType />
        </Box>
      </Box>
      <Box px={{ md: 4, xs: 2 }}>
        <CTypeList list={ctypes} />
      </Box>
    </Stack>
  );
};

export default Issue;
