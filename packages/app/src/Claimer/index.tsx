// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useToggle } from '@credential/react-hooks';

import Header from '../Header';
import { ClaimsIcon, CTypeIcon, MessageIcon } from '../icons';
import { useNotification } from '../Notification/useNotification';
import Sidebar from '../Sidebar';

const Claimer: React.FC = () => {
  const { breakpoints, palette, transitions } = useTheme();
  const navigate = useNavigate();
  const upMd = useMediaQuery(breakpoints.up('md'));

  const [open, toggleOpen] = useToggle(!!upMd);
  const { pathname } = useLocation();
  const unreads = useNotification();

  const items = useMemo(
    () => [
      {
        to: '/claimer/ctype',
        active: pathname.startsWith('/claimer/ctype'),
        svgIcon: (
          <CTypeIcon
            color={pathname.startsWith('/claimer/ctype') ? palette.primary.main : undefined}
          />
        ),
        text: 'Credential type'
      },
      {
        to: '/claimer/claims',
        active: pathname.startsWith('/claimer/claims'),
        svgIcon: (
          <ClaimsIcon
            color={pathname.startsWith('/claimer/claims') ? palette.primary.main : undefined}
          />
        ),
        text: 'Credentials'
      },
      {
        to: '/claimer/message',
        active: pathname.startsWith('/claimer/message'),
        svgIcon: (
          <MessageIcon
            color={pathname.startsWith('/claimer/message') ? palette.primary.main : undefined}
          />
        ),
        text: 'Message'
      }
    ],
    [palette.primary.main, pathname]
  );

  return (
    <Box bgcolor="#F5F6FA" overflow="hidden" paddingTop="70px">
      <Header toggleOpen={toggleOpen} unreads={unreads} />
      <Box
        sx={{
          height: '150px',
          background: 'url(./world-cup-games/banner.webp) no-repeat',
          backgroundSize: 'auto 150px',
          backgroundPosition: 'center',
          backgroundColor: '#0C6724'
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          sx={{
            justifyContent: 'space-around',
            maxWidth: '1440px',
            margin: '0 auto',
            paddingTop: '84px'
          }}
        >
          <Button
            onClick={() => navigate('/attester/issue')}
            sx={{
              width: '190px',
              height: '43px',
              background: 'url(./world-cup-games/btn_startguessing.webp) no-repeat',
              backgroundSize: 'cover'
            }}
          />
          <Button
            sx={{
              width: '190px',
              height: '43px',
              background: 'url(./world-cup-games/btn_eventguide.webp) no-repeat',
              backgroundSize: 'cover'
            }}
          />
        </Stack>
      </Box>
      <Box overflow="hidden" position="relative">
        <Sidebar accountType="claimer" items={items} open={open} toggleOpen={toggleOpen} />
        <Box
          height="calc(100vh - 220px)"
          overflow="scroll"
          pl={upMd ? (open ? '220px' : '93px') : 0}
          sx={{
            position: 'relative',
            boxSizing: 'border-box',

            transition: open
              ? transitions.create('padding', {
                  easing: transitions.easing.sharp,
                  duration: transitions.duration.enteringScreen
                })
              : transitions.create('padding', {
                  easing: transitions.easing.sharp,
                  duration: transitions.duration.leavingScreen
                })
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Claimer;
