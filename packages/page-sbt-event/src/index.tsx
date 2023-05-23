// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Typography } from '@mui/material';

import Introduction from './Introduction';
import MainStep from './MainSteps';
import OptionalStep from './OptionalStep';

const PageSbtEvent = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh'
      }}
    >
      <Banner />
      <Container
        maxWidth='xl'
        sx={{
          paddingTop: '100px',
          paddingX: {
            xl: '16px',
            md: '100px'
          },
          background: 'url(/images/bag_security.webp) no-repeat',
          backgroundPosition: 'left bottom'
        }}
      >
        <Introduction />
        <MainStep />
        <OptionalStep />
      </Container>
    </Box>
  );
};

const Banner = () => {
  return (
    <Box
      pt={7}
      sx={{
        width: '100%',
        minHeight: 540,
        background: 'url(/images/png_fingerprint.webp) no-repeat, url(/images/bac_banner.webp) no-repeat',
        backgroundPosition: 'center 70%',
        backgroundSize: 'contain,cover'
      }}
    >
      <Typography
        fontWeight={800}
        sx={{
          color: '#0042F1',
          fontSize: '54px',
          span: {
            color: '#fff'
          }
        }}
        textAlign='center'
      >
        zkKYC <span>Event</span>
      </Typography>
      <Typography
        color='#fff'
        mt={40}
        sx={{
          span: {
            fontWeight: 600
          }
        }}
        textAlign='center'
      >
        Supported by <span>Chaintool, zCloak Network</span>
      </Typography>
    </Box>
  );
};

export default PageSbtEvent;
