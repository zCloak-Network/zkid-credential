// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { IconTips } from '@credential/app-config/icons';
import { Box, Stack, Typography } from '@credential/react-components';

const Tips = () => {
  return (
    <Box>
      <Stack
        alignItems='center'
        direction='row'
        mb={3}
        p={1}
        spacing={1}
        sx={({ palette }) => ({
          border: '1px solid',
          borderColor: palette.grey[300],
          borderRadius: '5px'
        })}
      >
        <IconTips />
        <Typography>Recommend: import your credentials to zkID Wallet for later usage.</Typography>
      </Stack>
    </Box>
  );
};

export default React.memo(Tips);
