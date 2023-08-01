// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IconEth } from '@credential/app-config';
import IconDefi from '@credential/app-config/icons/IconDefi';

import StepCard, { StepCardProps } from './StepCard';
import Title from './Title';

const optional: StepCardProps = {
  label: 'Optional',
  content: 'Use an Ethereum wallet address to receive your zkID card.',
  Icon: <IconEth />,
  title: 'Set up on-chain recipient address',
  isLocked: false
};

const optionalDefiDemo: StepCardProps = {
  label: 'Optional',
  content: 'Try zkID Card usage in test Defi Demo.',
  Icon: <IconDefi />,
  title: 'Defi Demo',
  isLocked: false
};

const OptionalStep = () => {
  const navigate = useNavigate();

  return (
    <Box mt={10}>
      <Title value='Optional' />
      <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
        <StepCard {...optional} onClick={() => navigate('/claimer/did/profile')} />
        <StepCard {...optionalDefiDemo} onClick={() => window.open('#/demo', '_blank')} />
        <Box
          sx={{
            width: 370,
            height: 360
          }}
        />
      </Stack>
    </Box>
  );
};

export default OptionalStep;
