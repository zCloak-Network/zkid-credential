// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';

import { LoginContext } from './LoginProvider';

const ConnectWallet = () => {
  const { error, login } = useContext(LoginContext);

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
        onClick={login}
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
