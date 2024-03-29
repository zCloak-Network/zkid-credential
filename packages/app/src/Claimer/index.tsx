// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Banner from '@credential/page-sbt-event/Banner';
import { Box, useMediaQuery, useTheme } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import Header from '../Header';
import { ClaimsIcon, CTypeIcon, MessageIcon } from '../icons';
import { useNotification } from '../Notification/useNotification';
import Sidebar from '../Sidebar';

const Claimer: React.FC = () => {
  const { breakpoints, palette, transitions } = useTheme();
  const upMd = useMediaQuery(breakpoints.up('md'));

  const [open, toggleOpen] = useToggle(!!upMd);
  const { pathname } = useLocation();
  const unreads = useNotification();
  const navigate = useNavigate();

  const items = useMemo(
    () => [
      {
        to: '/claimer/ctype',
        active: pathname.startsWith('/claimer/ctype'),
        svgIcon: <CTypeIcon color={pathname.startsWith('/claimer/ctype') ? palette.primary.main : undefined} />,
        text: 'Credential type'
      },
      {
        to: '/claimer/claims',
        active: pathname.startsWith('/claimer/claims'),
        svgIcon: <ClaimsIcon color={pathname.startsWith('/claimer/claims') ? palette.primary.main : undefined} />,
        text: 'Credentials'
      },
      {
        to: '/claimer/message',
        active: pathname.startsWith('/claimer/message'),
        svgIcon: <MessageIcon color={pathname.startsWith('/claimer/message') ? palette.primary.main : undefined} />,
        text: 'Message'
      }
    ],
    [palette.primary.main, pathname]
  );

  return (
    <Box bgcolor='#F5F6FA' overflow='hidden' paddingTop='70px'>
      <Header toggleOpen={toggleOpen} unreads={unreads} />
      <Banner onClick={() => navigate('/event/zk-kyc2023')} />
      <Box overflow='hidden' position='relative'>
        <Sidebar accountType='claimer' items={items} open={open} toggleOpen={toggleOpen} />
        <Box
          height='calc(100vh - 70px)'
          overflow='scroll'
          pl={upMd ? (open ? '230px' : '93px') : 0}
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
