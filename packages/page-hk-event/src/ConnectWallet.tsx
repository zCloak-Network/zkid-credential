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
    await getDid();
    await login();
  }, [getDid, login]);

  return (
    <Box
      sx={{
        width: '100%',
        paddingX: 2,
        margin: '0 auto',
        position: 'absolute',
        bottom: 32
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
          bgcolor: '#fff',
          color: '#000'
        }}
        variant='contained'
      >
        Connect
      </Button>
    </Box>
  );
};

export default ConnectWallet;
