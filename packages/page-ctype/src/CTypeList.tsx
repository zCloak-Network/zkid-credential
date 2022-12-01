// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@credential/app-store';

import React from 'react';

import { getCTypeMetaForAttest } from '@credential/app-config/ctypes';
import { Box, CTypeCard, Unstable_Grid2 as Grid } from '@credential/react-components';

import CreateClaim from './create/CreateClaim';

const CTypeList: React.FC<{ list: CType[] }> = ({ list }) => {
  return (
    <Box>
      <Grid columns={{ xs: 4, sm: 8, lg: 12 }} container spacing={3}>
        {list.map((item, index) => (
          <Grid key={index} lg={4} xl={3} xs={4}>
            <CTypeCard
              actions={<CreateClaim ctype={item} />}
              ctype={item}
              meta={getCTypeMetaForAttest(item.$id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(CTypeList);
