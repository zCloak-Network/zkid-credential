// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Typography } from '@mui/material';

import ConnectWallet from './ConnectWallet';

const Login = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      position='relative'
      sx={{
        height: 730,
        background: 'url(/yantai-event/jpg_yt.webp) no-repeat, #F5DBB2',
        backgroundPosition: 'bottom left'
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
              fontSize: '34px',
              fontFamily: 'Montserrat',
              fontWeight: 600
            }
          }}
        >
          <Box
            mt={5}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50px',
              background: 'url(/yantai-event/logo_zcloak.svg) no-repeat, #000000',
              backgroundPosition: 'center center'
            }}
          />
          <Typography className='HK_TITLE' mt={3.5}>
            SURFING SUMMER
          </Typography>
          <Typography className='HK_TITLE' mb={2}>
            YANTAI
          </Typography>
          <Box margin='auto' mb={3} px={6}>
            <Typography fontFamily='Montserrat' fontSize={14} fontWeight={400}>
              Surfing Summer 2023 is an offline Web3 event organized by CSWA on July 28-30, 2023 in Yantai, Shandong.
              This credential serves as zCloak’s free commemorative cards issued to all attendees.
            </Typography>
          </Box>
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
