// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { useContext } from 'react';

import ImportCType from '@credential/page-ctype/ImportCType';
import { CTypeContext } from '@credential/react-components';

import CTypeList from './CTypeList';

const Issue: React.FC = () => {
  const { ctypes } = useContext(CTypeContext);

  return (
    <Stack spacing={3}>
      <Tabs
        sx={{
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
        value={0}
      >
        <Tab label="Issue" />
      </Tabs>
      <Box px={{ md: 4, xs: 2 }}>
        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <ImportCType />
        </Box>
        <CTypeList list={ctypes} />
      </Box>
    </Stack>
  );
};

export default Issue;
