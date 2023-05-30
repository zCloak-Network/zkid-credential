// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IconEth } from '@credential/app-config';

import StepCard, { StepCardProps } from './StepCard';
import Title from './Title';

const optional: StepCardProps = {
  label: 'Optional',
  content: 'Use an Ethereum wallet address to receive your zkID card.',
  Icon: <IconEth />,
  title: 'Set up on-chain recipient address',
  isLocked: false
};

const OptionalStep = () => {
  const navigate = useNavigate();

  return (
    <Box mt={10}>
      <Title value='Optional' />
      <StepCard {...optional} onClick={() => navigate('/claimer/did/profile')} />
    </Box>
  );
};

export default OptionalStep;
