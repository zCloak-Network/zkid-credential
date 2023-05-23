// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { alpha, Box, Stack, Typography } from '@mui/material';

import { IconGo, IconLock, IconSlider } from '@credential/app-config';

export interface StepCardProps {
  Icon: JSX.Element;
  title: string;
  label: string;
  content: string;
  isLocked: boolean;
  onClick?: () => void;
}

const LockModal = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        bgcolor: alpha('#000000', 0.7),
        top: 0,
        left: 0,
        fontSize: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconLock />
    </Box>
  );
};

const StepCard: React.FC<StepCardProps> = ({ Icon, content, isLocked = true, label, onClick, title }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 370,
        height: 360,
        background: '#F0F5FF',
        paddingX: 3,
        paddingTop: 5,
        paddingBottom: 3,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: isLocked ? '2px dashed rgba(0,66,241,0.3)' : 'none'
      }}
    >
      {isLocked && <LockModal />}
      <Stack alignItems='flex-start' direction='row' justifyContent='space-between'>
        <Box
          alignItems='center'
          bgcolor={alpha('#0042F1', 0.1)}
          border='4px solid #FFFFFF'
          borderRadius='8px'
          boxShadow='0px 43px 60px 1px rgba(0,94,106,0.08)'
          color={alpha('#0042F1', 0.5)}
          display='flex'
          fontSize='40px'
          height={80}
          justifyContent='center'
          width={80}
        >
          {Icon}
        </Box>
        <Typography>{label}</Typography>
      </Stack>
      <Typography fontSize='1.5rem' fontWeight={700} mb={1} mt={3}>
        {title}
      </Typography>
      <Typography color='#6B625E' flexGrow={1}>
        {content}
      </Typography>
      <Stack direction='row' justifyContent='space-between'>
        <IconSlider />
        <IconGo />
      </Stack>
    </Box>
  );
};

export default StepCard;
