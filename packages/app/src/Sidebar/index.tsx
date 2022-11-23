// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import {
  alpha,
  CSSObject,
  Drawer as MuiDrawer,
  Fab,
  IconButton,
  lighten,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Theme,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { isMobile } from '@credential/react-hooks/utils/userAgent';

interface Item {
  to: string;
  active: boolean;
  svgIcon: React.ReactNode;
  text: string;
  extra?: React.ReactNode;
}

type ACCOUNT_TYPE = 'claimer' | 'attester';

interface Props {
  accountType: ACCOUNT_TYPE;
  items: Item[];
  open: boolean;
  toggleOpen: () => void;
}

const drawerWidth = '220px';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflow: 'visible'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  width: `calc(${theme.spacing(10.5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11.5)} + 1px)`
  },
  overflow: 'visible'
});

const DrawerMd = styled(MuiDrawer, {
  shouldForwardProp: (prop) => !['open', 'accountType'].includes(prop as string)
})<{
  accountType: ACCOUNT_TYPE;
}>(({ accountType, open, theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    background:
      accountType === 'attester' ? theme.palette.common.black : theme.palette.common.white,
    zIndex: 99,
    padding: '100px 16px 0',
    borderRight: 'none',
    ...(open ? openedMixin(theme) : closedMixin(theme))
  },
  ...(open && {
    ...openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme)
  })
}));

const DrawerSm = styled(MuiDrawer, {
  shouldForwardProp: (prop) => !['accountType'].includes(prop as string)
})<{
  accountType: ACCOUNT_TYPE;
}>(({ accountType, theme }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    background:
      accountType === 'attester' ? theme.palette.common.black : theme.palette.common.white,
    zIndex: 99,
    padding: '16px',
    borderRight: 'none'
  }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  marginBottom: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between'
}));

const Sidebar: React.FC<Props> = ({ accountType, items, open, toggleOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const Drawer = useMemo(() => (upMd ? DrawerMd : DrawerSm), [upMd]);

  return (
    <Drawer
      ModalProps={{
        keepMounted: isMobile
      }}
      accountType={accountType}
      onClose={toggleOpen}
      open={open}
      variant={upMd ? 'permanent' : 'temporary'}
    >
      {!upMd && (
        <DrawerHeader
          sx={({ palette }) => ({
            '.MuiButtonBase-root': {
              color: accountType === 'attester' ? palette.common.white : null
            }
          })}
        >
          <IconButton onClick={toggleOpen} sx={{ color: 'inherit' }}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
      )}
      <List>
        {items.map(({ active, extra, svgIcon, text, to }, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={({ palette }) => ({
              display: 'block',
              mb: 2,
              background: active
                ? alpha(palette.primary.main, accountType === 'attester' ? 1 : 0.1)
                : undefined
            })}
          >
            <ListItemButton
              onClick={() => navigate(to)}
              sx={({ palette }) => ({
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color:
                  accountType === 'attester'
                    ? active
                      ? palette.common.white
                      : palette.grey[500]
                    : active
                    ? palette.primary.main
                    : palette.common.black
              })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'inherit'
                }}
              >
                {svgIcon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <span>{text}</span>
                    {extra}
                  </Stack>
                }
                sx={() => ({
                  opacity: open ? 1 : 0
                })}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {upMd && (
        <Fab
          color="primary"
          onClick={toggleOpen}
          size="small"
          sx={({ palette }) => ({
            display: 'flex',
            position: 'absolute',
            marginTop: -3,
            right: -15,
            width: 30,
            height: 30,
            minHeight: 30,
            background: lighten(palette.primary.main, 0.15)
          })}
        >
          {open ? <KeyboardArrowLeftRoundedIcon /> : <KeyboardArrowRightRoundedIcon />}
        </Fab>
      )}
    </Drawer>
  );
};

export default React.memo(Sidebar);
