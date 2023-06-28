// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Typography } from '@mui/material';

import ConnectWallet from './ConnectWallet';

function LogoIcon({ url }: { url: string }) {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        bgcolor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        img: {
          userSelect: 'none'
        }
      }}
    >
      <img src={url} width={44} height={44} />
    </Box>
  );
}

const Login = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      position='relative'
      sx={{
        height: 730,
        background: 'url(/hk-event/bag_shanghai.webp) no-repeat,linear-gradient(180deg, #BAC8E9 0%, #F6E3CD 100%)',
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
          <Stack direction='row' mt={3} spacing={2}>
            <LogoIcon url='/hk-event/logo_zcloak.png' />
            <LogoIcon url='/hk-event/logo_seedao.png' />
            <LogoIcon url='/hk-event/logo_deepdao.png'/>
          </Stack>
          <Typography className='HK_TITLE' mt={3.5}>
            DAO Salon
          </Typography>
          <Typography className='HK_TITLE' mb={2}>
            Shanghai July 2nd 2023
          </Typography>
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
