// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@credential/app-store';

import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { CTypeCard } from '@credential/react-components';

const CTypeList: React.FC<{ list: CType[] }> = ({ list }) => {
  return (
    <Box>
      <Grid columns={{ xs: 4, sm: 8, lg: 12 }} container spacing={3}>
        {list.map((item, index) => (
          <Grid key={index} lg={4} xl={3} xs={4}>
            <CTypeCard ctype={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(CTypeList);
