// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container } from '@mui/material';

import Banner from './Banner';
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

export default PageSbtEvent;
