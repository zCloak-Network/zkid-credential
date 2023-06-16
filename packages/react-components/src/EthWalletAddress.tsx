// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import LogoutIcon from '@mui/icons-material/Logout';
import { alpha, Stack, Typography } from '@mui/material';
import { useAccount, useDisconnect } from 'wagmi';

import Address from './Address';
import IconButton from './IconButton';
import IdentityIcon from './IdentityIcon';

const EthWalletAddress = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Stack
      alignItems='center'
      bgcolor={alpha('#6768ac', 0.1)}
      borderRadius='50px'
      direction='row'
      paddingX={1}
      spacing={1}
    >
      <IdentityIcon diameter={24} value={address} />
      <Typography variant='caption'>
        <Address value={address} />
      </Typography>
      <IconButton onClick={() => disconnect()}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
};

export default EthWalletAddress;
