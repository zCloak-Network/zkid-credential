// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';

import { DidContext } from './DidProvider';
import { LoginContext } from './LoginProvider';

const ConnectWallet = () => {
  const { getDid } = useContext(DidContext);
  const { error, login } = useContext(LoginContext);

  const connect = useCallback(async () => {
    const did = await getDid();

    await login(did);
  }, [getDid, login]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 230,
        paddingX: 2,
        margin: '0 auto'
      }}
    >
      {error && (
        <Typography color='error' mt={1} textAlign='center'>
          {error.message}
        </Typography>
      )}
      <Button
        fullWidth
        onClick={connect}
        sx={{
          height: 50,
          bgcolor: '#000',
          color: '#fff',
          borderRadius: '25px',
          boxShadow: '0px 4px 20px rgba(45,51,60,0.27)',
          ':hover': {
            bgcolor: '#000',
            opacity: 0.8
          }
        }}
        variant='contained'
      >
        Connect zkID Wallet
      </Button>
    </Box>
  );
};

export default ConnectWallet;
