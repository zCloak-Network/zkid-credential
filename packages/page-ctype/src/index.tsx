// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { CTypeContext } from '@credential/react-components';

import CTypeList from './CTypeList';
import ImportCType from './ImportCType';

const CType: React.FC = () => {
  const { cTypeList } = useContext(CTypeContext);

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
        <ImportCType />
      </Box>
      <CTypeList list={cTypeList} />
    </Box>
  );
};

export default CType;
