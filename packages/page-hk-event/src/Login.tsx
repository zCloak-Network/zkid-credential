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
        height: 830,
        background: '#000000'
        // backgroundPosition: 'top center'
      }}
    >
      <Box
        sx={{
          height: 510,
          background: 'url(/shanghai-event/img_bag.svg) no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}
      />
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
        <Stack alignItems='center' direction='column' sx={{}}>
          <Stack direction='row' mt={2} spacing={1.75}>
            <img src='/shanghai-event/logo_zcloak.svg' />
            <img src='/shanghai-event/logo_antalpha.svg' />
            <img src='/shanghai-event/logo_706.svg' />
          </Stack>
          <Stack mb={2} mt={3}>
            <img src='/shanghai-event/svg_title.svg' />
          </Stack>
          <Typography color='#FFF' mb={2}>
            Shenzhen, August 22, 2023
          </Typography>
          <ConnectWallet />
        </Stack>
      </Box>
      {/* <Stack alignItems='center' bottom={20} justifyContent='center' position='absolute' width='100%'>
        <Typography
          sx={{
            fontSize: '13px',
            fontFamily: 'Poppins'
          }}
        >
          Powered by zCloak
        </Typography>
      </Stack> */}
    </Box>
  );
};

export default Login;
