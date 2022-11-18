// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import {
  alpha,
  Badge,
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { IconAttester, IconLogoBlack } from '@credential/app-config/icons';
import { DidsContext } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import DidInfo from '../DidInfo';
import Notification from '../Notification';
import { UseNotification } from '../Notification/useNotification';

function Logo() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Link
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
          <Box color="black" component="span">
            Platform
          </Box>
        </>
      )}
    </Link>
  );
}

function Header({
  isAttester = false,
  toggleOpen,
  unreads
}: {
  isAttester?: boolean;
  unreads: UseNotification;
  toggleOpen: () => void;
}) {
  const { did } = useContext(DidsContext);
  const [notiOpen, toggleNotiOpen] = useToggle();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleNotification = useCallback(() => {
    toggleNotiOpen();
  }, [toggleNotiOpen]);

  return (
    <>
      <Box
        fontSize="small"
        sx={({ palette }) => ({
          zIndex: 999,
          position: 'fixed',
          top: 0,
          width: '100%',
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: palette.warning.main,
          color: palette.common.white
        })}
      >
        <ReportProblemOutlinedIcon fontSize="small" sx={{ marginRight: 2 }} />
        Please backup your DID account and your credential file before logging out and do not clear
        local storage for the duration of this event.
      </Box>
      <Stack
        alignItems="center"
        direction="row"
        height={70}
        justifyContent="space-between"
        sx={({ palette }) => ({
          paddingX: upMd ? 5 : 2,
          zIndex: 999,
          position: 'fixed',
          top: 30,
          width: '100%',
          background: palette.common.white,
          borderBottom: '1px solid',
          borderBottomColor: alpha(palette.primary.main, 0.1)
        })}
      >
        <Stack alignItems="center" direction="row" spacing={upMd ? 2 : 1}>
          {!upMd && (
            <IconButton onClick={toggleOpen} size="small">
              <MenuIcon />
            </IconButton>
          )}
          <Logo />
          {upSm && isAttester && (
            <Chip
              color="primary"
              label={
                <Stack alignItems="center" direction="row" spacing={0.5}>
                  <IconAttester />
                  <Box>Attester</Box>
                </Stack>
              }
              variant="outlined"
            />
          )}
          {upSm && <Chip color="warning" label="Beta" variant="outlined" />}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={upMd ? 2 : 1}>
          <IconButton onClick={handleNotification} size={upMd ? 'medium' : 'small'}>
            <Badge badgeContent={unreads.allUnread} color="warning" max={99}>
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
          {did && <DidInfo did={did} />}
        </Stack>
      </Stack>
      <Notification onClose={toggleNotiOpen} open={notiOpen} unreads={unreads} />
    </>
  );
}

export default React.memo(Header);
