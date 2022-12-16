// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginDid } from '@zcloak/login-did';

import { IconAttester, IconLogoBlack } from '@credential/app-config/icons';
import IconClaimer from '@credential/app-config/icons/IconClaimer';
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
} from '@credential/react-components';
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
  const { did, isLocked, lock } = useContext(DidsContext);
  const navigate = useNavigate();
  const [notiOpen, toggleNotiOpen] = useToggle();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleRole = useCallback(() => {
    isAttester ? navigate('/claimer') : navigate('/attester');
  }, [isAttester, navigate]);

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        height={70}
        justifyContent="space-between"
        sx={({ palette }) => ({
          paddingX: upMd ? 5 : 2,
          zIndex: 999,
          position: 'fixed',
          top: 0,
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
          {upSm && (
            <Chip
              color="primary"
              label={
                <Stack alignItems="center" direction="row" spacing={0.5}>
                  {isAttester ? <IconAttester /> : <IconClaimer />}
                  <Box>{isAttester ? 'Attester' : 'Claimer'}</Box>
                </Stack>
              }
              onClick={handleRole}
              variant="outlined"
            />
          )}
          {upSm && <Chip color="warning" label="Beta" variant="outlined" />}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={upMd ? 2 : 1}>
          <IconButton onClick={toggleNotiOpen} size={upMd ? 'medium' : 'small'}>
            <Badge badgeContent={unreads.allUnread} color="warning" max={99}>
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
          {!(did instanceof LoginDid) && (
            <IconButton onClick={!isLocked ? lock : undefined} size={upMd ? 'medium' : 'small'}>
              {isLocked ? <Lock /> : <LockOpen />}
            </IconButton>
          )}
          <DidInfo did={did} />
        </Stack>
      </Stack>
      <Notification onClose={toggleNotiOpen} open={notiOpen} unreads={unreads} />
    </>
  );
}

export default React.memo(Header);
