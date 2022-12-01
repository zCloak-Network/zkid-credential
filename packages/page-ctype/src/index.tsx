// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Box, Typography } from '@credential/react-components';

import CTypeList from './CTypeList';
import ImportCType from './ImportCType';
import { useAttestCTypes } from './useAttestCTypes';

const CType: React.FC = () => {
  const ctypes = useAttestCTypes();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 3
        }}
      >
        <Typography variant="h2">Credential type</Typography>
        <ImportCType variant="contained" />
      </Box>
      <CTypeList list={ctypes} />
    </Box>
  );
};

export default CType;
