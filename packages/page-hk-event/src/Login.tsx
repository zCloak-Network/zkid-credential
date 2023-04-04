// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Typography } from '@mui/material';

import { IconWeb3 } from '@credential/app-config';

import ConnectWallet from './ConnectWallet';

const Login = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      position='relative'
      sx={{
        height: 730,
        background: 'url(/hk-event/jpg_hk.webp) no-repeat #F4F5F9',
        backgroundPosition: 'bottom center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '.Logo_Icons': {
            width: 50,
            height: 50,
            bgcolor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px'
          }
        }}
      >
        <Stack
          alignItems='center'
          direction='column'
          pt={6.25}
          sx={{
            '.HK_TITLE': {
              color: '#000',
              fontSize: '39px',
              fontFamily: 'BebasNeue'
            }
          }}
        >
          <Box className='Logo_Icons'>
            <img height={22} src={IconWeb3} width={33} />
          </Box>

          <Typography className='HK_TITLE' mt={3.5}>
            WELCOME TO
          </Typography>
          <Typography className='HK_TITLE'>HONG KONG WEB3 FESTIVAL</Typography>
          <Typography className='HK_TITLE'>2023</Typography>
          <ConnectWallet />
        </Stack>
      </Box>
      <Stack alignItems='center' bottom={20} justifyContent='center' position='absolute' width='100%'>
        <Typography
          sx={{
            fontSize: '13px',
            fontFamily: 'Poppins'
          }}
        >
          Powered by zCloak
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
