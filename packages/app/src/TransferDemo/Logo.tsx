// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconLogoBlack } from '@credential/app-config/icons';
import { alpha, Box, IconButton, Link, Stack, useMediaQuery, useTheme } from '@credential/react-components';
import { DidsContext, isLoginDid } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import DidInfo from '../DidInfo';
import Notification from '../Notification';
import { UseNotification } from '../Notification/useNotification';

export default function Logo() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  return (
    <Link
    //   onClick={() => navigate('/claimer/ctype')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 700,
        cursor: 'pointer'
      }}
    >
      <Box component={IconLogoBlack} mr={upMd ? 1.5 : 1} />
      {upMd && (
        <>
          Credential&nbsp;
          <Box color='black' component='span'>
            Platform
          </Box>
        </>
      )}
    </Link>
  );
}
