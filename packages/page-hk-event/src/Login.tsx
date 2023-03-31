// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Typography } from '@mui/material';

import { FirstTopLogo, IconAnd, IconWeb3 } from '@credential/app-config';

import ConnectWallet from './ConnectWallet';

const Login = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      position='relative'
      sx={{
        height: '100%',
        minHeight: 620
      }}
    >
      <Box
        bgcolor='#4B45FF'
        height={230}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '.Logo_Icons': {
            width: 64,
            height: 64,
            bgcolor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15px'
          }
        }}
      >
        <Stack direction='row' spacing={5}>
          <Box className='Logo_Icons'>
            <img height={35} src={IconWeb3} width={50} />
          </Box>
          <Box className='Logo_Icons' fontSize={39}>
            <FirstTopLogo />
          </Box>
        </Stack>
      </Box>
      <Stack
        alignItems='center'
        bgcolor='#051C3F'
        flexGrow={1}
        pt={6}
        sx={{
          '.MuiTypography-root': {
            color: '#fff',
            fontSize: '39px',
            fontFamily: 'BebasNeue'
          }
        }}
      >
        <Typography>WELCOME TO</Typography>

        <Typography
          sx={{
            textShadow: '0px 3px 20px rgba(255,255,255,0.33)'
          }}
        >
          ZCLOAK
        </Typography>
        <IconAnd />
        <Typography
          sx={{
            textShadow: '0px 3px 20px rgba(255,255,255,0.33)'
          }}
        >
          HK WEB3 FESTIVAL
        </Typography>
        <Typography>CREDENTIAL EVENT</Typography>
      </Stack>
      <ConnectWallet />
    </Box>
  );
};

export default Login;
