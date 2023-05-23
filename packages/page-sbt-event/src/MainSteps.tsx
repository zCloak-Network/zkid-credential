// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack } from '@mui/material';

// import { IconCard, IconChaintool, IconLogoZkid } from '@credential/app-config';
// import MailLockIcon from '@mui/icons-material/MailLock';
import { useSteps } from './hooks/useSteps';
import StepCard from './StepCard';
import Title from './Title';

// const steps: StepCardProps[] = [
//   {
//     label: 'Step1',
//     content: 'Finish Chaintool KYC',
//     Icon: <IconChaintool />,
//     title: 'Finish Chaintool KYC',
//     onClick: () => window.open('https://passport.chaintool.ai/', '_blank'),
//     isLocked: false
//   },
//   {
//     label: 'Step2',
//     content: 'Decrypt from Message',
//     Icon: <MailLockIcon />,
//     title: 'Decrypt from Message',
//     onClick: () => {},
//     isLocked: true
//   },
//   {
//     label: 'Step3',
//     content: 'Only after importing the zkID Wallet, you can perform zk operations.',
//     Icon: <IconLogoZkid />,
//     title: 'Add KYC Credential to zkID Wallet',
//     onClick: () => {},
//     isLocked: true
//   },
//   {
//     label: 'Step4',
//     content: 'Mint zkID Card to use your KYC information without leaking any personal information.',
//     Icon: <IconCard />,
//     title: 'Mint zkID Card',
//     onClick: () => {},
//     isLocked: true
//   }
// ];

const MainStep = () => {
  const { steps } = useSteps();

  return (
    <Box mt={10}>
      <Title value='Main Step' />
      <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
        {steps.map((item, key) => {
          return <StepCard {...item} key={key} />;
        })}
      </Stack>
    </Box>
  );
};

export default MainStep;
