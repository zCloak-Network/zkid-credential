// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { IconIssue, IconMessage, IconMyctype, IconTask } from '@credential/app-config/icons';
import { Box, useMediaQuery, useTheme } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import Header from '../Header';
import { useNotification } from '../Notification/useNotification';
import Sidebar from '../Sidebar';

const Badge: React.FC<{ value: number }> = ({ value }) => {
  return (
    <Box
      color="warning"
      sx={({ palette }) => ({
        minWidth: 20,
        height: 20,
        borderRadius: '10px',
        textAlign: 'center',
        lineHeight: '20px',
        background: palette.warning.main,
        fontSize: 12,
        color: palette.common.black
      })}
    >
      {value > 99 ? '99+' : value}
    </Box>
  );
};

const Attester: React.FC = () => {
  const { breakpoints, transitions } = useTheme();
  const upMd = useMediaQuery(breakpoints.up('md'));

  const [open, toggleOpen] = useToggle(!!upMd);
  const { pathname } = useLocation();
  const unreads = useNotification();

  const items = useMemo(
    () => [
      {
        to: '/attester/ctypes',
        active: pathname.startsWith('/attester/ctypes'),
        svgIcon: <IconMyctype />,
        text: 'My ctypes'
      },
      {
        to: '/attester/tasks',
        active: pathname.startsWith('/attester/tasks'),
        svgIcon: <IconTask />,
        text: 'Tasks',
        extra: unreads.taskUnread ? <Badge value={unreads.taskUnread} /> : undefined
      },
      {
        to: '/attester/issue',
        active: pathname.startsWith('/attester/issue'),
        svgIcon: <IconIssue />,
        text: 'Issue'
      },
      {
        to: '/attester/message',
        active: pathname.startsWith('/attester/message'),
        svgIcon: <IconMessage />,
        text: 'Message',
        extra: unreads.messageUnread ? <Badge value={unreads.messageUnread} /> : undefined
      }
    ],
    [pathname, unreads.messageUnread, unreads.taskUnread]
  );

  return (
    <>
      <Box bgcolor="#fff" overflow="hidden" paddingTop="70px">
        <Header isAttester toggleOpen={toggleOpen} unreads={unreads} />
        <Box></Box>
        <Box overflow="hidden" position="relative">
          <Sidebar accountType="attester" items={items} open={open} toggleOpen={toggleOpen} />
          <Box
            height="calc(100vh - 70px)"
            overflow="scroll"
            pl={upMd ? (open ? '220px' : '93px') : 0}
            sx={{
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
    </>
  );
};

export default Attester;
