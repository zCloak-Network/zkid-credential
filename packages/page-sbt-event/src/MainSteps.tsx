// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack } from '@mui/material';

import { useSteps } from './hooks/useSteps';
import StepCard from './StepCard';
import Title from './Title';

const MainStep = () => {
  const { steps } = useSteps();

  return (
    <Box mt={10}>
      <Title value='Work Flow' />
      <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
        {steps.map((item, key) => {
          return <StepCard {...item} key={key} />;
        })}
      </Stack>
    </Box>
  );
};

export default MainStep;
