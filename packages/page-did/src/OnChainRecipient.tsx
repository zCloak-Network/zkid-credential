// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Stack, Typography } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import EthBind from './eth-bind';

const OnChainRecipient = () => {
  const [open, toggle] = useToggle();

  return (
    <Stack mt={4}>
      <Typography
        sx={({ palette }) => ({
          color: palette.grey[700]
        })}
        variant='inherit'
      >
        Ethereum Address:
      </Typography>
      <Button onClick={toggle}>Set</Button>
      <EthBind onClose={toggle} open={open} />
    </Stack>
  );
};

export default OnChainRecipient;
