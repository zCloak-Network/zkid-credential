// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@credential/react-components';

import Header from '../Header';
import { useNotification } from '../Notification/useNotification';

const NoSidebar: React.FC = () => {
  const unreads = useNotification();

  return (
    <Box bgcolor='#F5F6FA' overflow='hidden' paddingTop='70px'>
      <Header unreads={unreads} />
      <Box overflow='hidden' position='relative'>
        <Box
          height='calc(100vh - 70px)'
          overflow='scroll'
          sx={{
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default NoSidebar;
