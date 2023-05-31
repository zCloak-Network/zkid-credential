// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Box, Typography } from '@credential/react-components';

const SigItem: React.FC<{ value?: string; label?: string; mt?: number; mb?: number }> = ({ label, mb, mt, value }) => {
  return (
    <Box mb={mb} mt={mt}>
      <Typography color='#8F95B2' fontSize={14} mb={1}>
        {label}
      </Typography>

      <Box
        sx={{
          width: '100%',
          paddingX: 2.25,
          paddingY: 1.75,
          bgcolor: '#F7F8FA',
          borderRadius: '5px',
          wordWrap: 'break-word'
        }}
      >
        <Typography fontSize={14}>{value}</Typography>
      </Box>
    </Box>
  );
};

export default React.memo(SigItem);
