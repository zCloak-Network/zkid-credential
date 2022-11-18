// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { IconLogo } from '@credential/app-config/icons';

const Wrapper = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #F4F5FC 0%, #F6F7FD 82%, #FFFFFF 100%)'
}));

const Logo = styled('a')(
  ({ theme }) => `
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: ${theme.palette.primary.main};
  cursor: pointer;

  > img {
    margin-right: ${theme.spacing(2)}
  }
`
);

const AccountFrame: React.FC = () => {
  return (
    <Wrapper>
      <Stack alignItems="center" justifyContent="center" mb={2} py={2.5}>
        <Logo>
          <Box component={IconLogo} mr={2} />
          zCloak Network
        </Logo>
      </Stack>
      <Outlet />
    </Wrapper>
  );
};

export default React.memo(AccountFrame);
