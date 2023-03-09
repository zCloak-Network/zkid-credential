// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, StepIconProps, useTheme } from '@mui/material';
import React from 'react';

const StepIcon: React.FC<StepIconProps> = ({ active, completed, icon }) => {
  const { palette } = useTheme();

  return (
    <Box
      border={`1px solid ${palette.grey[500]}`}
      borderColor={completed ? 'transparent' : active ? palette.primary.main : undefined}
      borderRadius={2.5}
      height={36}
      p={0.5}
      width={36}
    >
      <Box
        alignItems='center'
        bgcolor={active || completed ? palette.primary.main : 'transparent'}
        borderRadius={2}
        color={active || completed ? palette.common.white : palette.grey[500]}
        display='flex'
        height='100%'
        justifyContent='center'
        width='100%'
      >
        {icon}
      </Box>
    </Box>
  );
};

export default React.memo<typeof StepIcon>(StepIcon);
