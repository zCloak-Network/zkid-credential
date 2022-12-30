// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonWallet,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { provider } from '@credential/react-dids/instance';
import { useQueryParam, useToggle } from '@credential/react-hooks';
import { useLoginWalletCallback } from '@credential/react-hooks/useLoginWalletCallback';

import WalletNotInstall from './WalletNotInstall';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [redirect] = useQueryParam<string>('redirect');
  const [login] = useQueryParam<string>('login');

  const [type, setType] = useState(0);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [open, toggleOpen] = useToggle();
  const loginWallet = useLoginWalletCallback();

  useEffect(() => {
    if (!login || login !== 'zkid-wallet') return;

    if (!provider) {
      toggleOpen();

      return;
    }

    loginWallet().then(() => {
      navigate(redirect ?? '/claimer/ctype');
    });
  }, [loginWallet, redirect, login, navigate, toggleOpen]);

  return (
    <Container maxWidth="lg">
      <WalletNotInstall onClose={toggleOpen} open={open} />
      <Stack alignItems="center" direction={upMd ? 'row' : 'column'} justifyContent="space-between">
        <Stack spacing={3}>
          <Typography variant="h1">
            Welcome to
            <br />
            zCloak Credential Center
          </Typography>
          <Typography>Create a New Credential account.</Typography>
          {type === 1 ? (
            <>
              <Button
                onClick={() =>
                  navigate({
                    pathname: '/account/create',
                    search: redirect ? `?redirect=${redirect}` : undefined
                  })
                }
                size="large"
                variant="contained"
              >
                Create account
              </Button>
              <Button
                onClick={() =>
                  navigate({
                    pathname: '/account/restore',
                    search: redirect ? `?redirect=${redirect}` : undefined
                  })
                }
                size="large"
                variant="outlined"
              >
                Restore account
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setType(1)} size="large" variant="contained">
                Web wallet
              </Button>
              <ButtonWallet
                onDone={() => {
                  navigate(redirect ?? '/claimer');
                }}
                size="large"
                variant="contained"
              />
            </>
          )}
        </Stack>
        <Box component="img" maxWidth="100%" src="/images/home-pic.webp" width="490px" />
      </Stack>
    </Container>
  );
};

export default Account;
